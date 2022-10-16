const express = require('express')
const multer = require('multer')
const langDetect = require('langdetect')
const cors = require('cors')
const dictionaryEntries = require('./dictionary.js')
const database = require('./database.js')
const path = require('path')
const os = require('os')
const lengthenLanguage = require('./utils/lengthenLanguage')
const { glosbeWords, glosbeTranslate } = require('./glosbe')
const axios = require('axios')
const fs = require('fs')
const https = require('https')
const convertBytes = require('./utils/convertBytes')

const augustoFolder = path.join(os.homedir(), 'Documents', 'AugustoTest')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(augustoFolder, 'books'))
  },
  filename: (req, file, cb) => {
    const title = file.originalname.replace('&', 'e') // removing & from title (can cause a but due params in iframe params)
    req.title = title // sending new req from middleware
    cb(null, `${title}`)
  }
})

const upload = multer({ storage })
const app = express()
const port = 2001

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(augustoFolder, 'books')))

app.post('/book', upload.single('file'), async (req, res) => {
  try {
    // selecting just the most probable language (index [0].lang),
    // return exemple: [{"lang": "en", "prob": "0.3232"}, "lang": "fr", "prob": "0.45345"}]
    const language = {}
    language.short = langDetect.detect(req.file.originalname)?.[0].lang
    language.long = lengthenLanguage(language.short)

    const title = req.title.substring(0, req.title.lastIndexOf('.'))
    const book = await database.save(title, language)
    return res.status(200).json({ message: 'Book uploaded.', book })
  } catch (error) {
    return res.status(500).json({ message: 'Error while storing book.' })
  }
})

app.get('/books', async (req, res) => {
  try {
    if (req.query.book) {
      const book = await database.getOne(req.query.book)
      if (book) return res.status(200).json({ book })
      else return res.status(404).json({ message: 'This book has not found.' })
    } else {
      const books = await database.getAll()
      return res.status(200).json({ ...books })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error while getting books.' })
  }
})

app.delete('/delete/:book', async (req, res) => {
  try {
    await database.delete(req.params.book)
    return res.status(200).json({ message: 'Book deleted.' })
  } catch (error) {
    return res.status(500).json({ message: 'Error while deleting book.' })
  }
})

app.get('/read/:id', (req, res) => {
  const book = database.getOne(req.params.id)
  const bookTitle = `${book.title}.epub`
  return res.sendFile(path.join(path.join(augustoFolder, 'books', bookTitle)), {
    headers: {
      'Content-Type': 'application/epub+zip'
    }
  })
})

app.patch('/language/:language', async (req, res) => {
  try {
    const { language } = req.params
    database.changeUserDefaultLanguage(language)
    res.status(200).json({ message: 'Langauge updated.' })
  } catch (errpr) {
    res.status(400).json({ message: 'Some error happened.' })
  }
})

app.patch('/bookLanguage/:id/:language', async (req, res) => {
  try {
    const { id, language } = req.params
    database.patchLanguage(id, language)
    return res.status(200).json({ message: 'Language updated.' })
  } catch (error) {
    return res.status(400).json({ message: 'We couldn\'t update this book\'s language.' })
  }
})

app.get('/translate/:text/:language', async (req, res) => {
  const { text, language } = req.params
  // const { defaultLanguage } = database.user
  const definitions = {
    freedict: false,
    glosbeWords: false,
    glosbeTranslate: false
  }

  // that's bad
  definitions.freedict = await dictionaryEntries(language, text)
  if (!definitions.freedict) {
    definitions.glosbeWords = await glosbeWords(language, text)
    if (!definitions.glosbeWords) {
      definitions.glosbeTranslate = await glosbeTranslate(language, text)
    }
  }

  // i dont think i'll use this again, but...
  // if (defaultLanguage === language) {
  //   return res.status(404).json({ message: `You're trying to translate from your native language (${language} to ${defaultLanguage}).` })
  // }

  // if (!database.dicts[defaultLanguage].includes(language)) {
  //   return res.status(404).json({ message: `Augusto don't support this dictionary yet (${language} to ${defaultLanguage}).` })
  // }

  if (!definitions.freedict && !definitions.glosbeWords && !definitions.glosbeTranslate) {
    return res.status(404).json({ message: "We couldn't found some definitions or translations for this. 🥺" })
  } else return res.status(200).json({ ...definitions })
})

// TOOD: create a separate file to lead with dictionaries
app.get('/dictionaries/:language', async (req, res) => {
  const { language } = req.params
  const url = encodeURI('https://raw.githubusercontent.com/woistkeller/dictionariesforaugusto/main/dictionaries.json') // dicitionaries file

  axios(url).then(response => {
    if (response.data[language]) res.json(response.data[language])
    else res.status(404).json({ message: 'Sorry, We couldn\'t found any dictionary for this language.' })
  })
})

app.post('/download/', async (req, res) => {
  try {
    const dictionary = req.body.path
    const dictsFolder = path.join(os.homedir(), 'Documents', 'AugustoTest', 'dictionaries')
    const url = encodeURI(`https://raw.githubusercontent.com/woistkeller/dictionariesforaugusto/main/${dictionary}`)
    const dictionaryToSave = {}
    https.get(url, (response) => {
      const where = `${dictsFolder}/${dictionary}`
      const filePath = fs.createWriteStream(where)
      response.pipe(filePath)
      filePath.on('finish', () => {
        dictionaryToSave.size = convertBytes(filePath.bytesWritten)
        dictionaryToSave.path = dictionary.slice(0, dictionary.lastIndexOf('.'))
        dictionaryToSave.language = dictionaryToSave.path.split('-')[1]
        dictionaryToSave.from = dictionaryToSave.path.split('-')[0]
        filePath.close()
        database.addDictionary(dictionaryToSave)
        return res.status(200)
      })
    })
  } catch (error) {
    return res.status(500)
  }
})

app.post('/progress', async (req, res) => {
  const { id, progress } = req.body
  database.updateProgress(id, progress)
  res.status(200).json({ message: 'Everything went right.' })
})

app.listen(port, () => {
  console.log(`We've taken off 🛫 on ${port} port`)
})
