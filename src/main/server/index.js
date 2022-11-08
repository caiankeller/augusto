// native modules
const path = require('path')
const os = require('os')
// dependencies
const express = require('express')
const multer = require('multer')
const cors = require('cors')
const axios = require('axios')
// translators
const dictionaryEntries = require('./dictionary.js')
const { glosbeWords, glosbeTranslate } = require('./glosbe')
// utils
const shortenLanguage = require('./utils/shortenLanguage')

const projectFolder = path.join(os.homedir(), 'Documents', '.augusto') // declaring the project folder
const database = require('./database.js') // hand made database

const storage = multer.diskStorage({
  // setting multer, this dependency lead with the book sent over http
  destination: (req, file, cb) => {
    cb(null, path.join(projectFolder, 'books'))
  },
  filename: (req, file, cb) => {
    const title = file.originalname.replace('&', 'e') // removing '&' from title (can cause a bug with params in iframe)
    req.title = title
    cb(null, `${title}`)
  }
})

const upload = multer({ storage })
const app = express()
const port = 2001

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(projectFolder, 'books')))

app.post('/book', upload.single('file'), async (req, res) => {
  const { bookLanguage } = req.body
  try {
    const language = {}
    language.long = bookLanguage
    language.short = shortenLanguage(language.long)

    const title = req.title.substring(0, req.title.lastIndexOf('.'))
    database.saveBook(title, language).then((book) => {
      return res
        .status(200)
        .json({ message: 'Book successfully uploaded.', book })
    })
  } catch (error) {
    return res.status(500).json({ message: 'Error while storing book.' })
  }
})

app.get('/books', async (req, res) => {
  const { bookIdentification } = req.query
  try {
    if (!bookIdentification) {
      return database.getAll().then((books) => {
        return res.status(200).json({ ...books })
      })
    }
    // if the book has not specificated
    database
      .getBook(bookIdentification)
      .then((book) => {
        return res.status(200).json({ book })
      })
      .catch((error) => {
        return res.status(404).json({ message: error })
      })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'An error occurred while searching for books saved.' })
  }
})

app.delete('/delete/book/:bookIdentification', async (req, res) => {
  const { bookIdentification } = req.params
  try {
    database
      .deleteBook(bookIdentification)
      .then(() => {
        return res.status(200).json({ message: 'Book successfully deleted.' })
      })
      .catch(() => {
        throw Error('Just being a little silly 😎')
      })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'An error occurred while deleting book.' })
  }
})

app.get('/read/:bookIdentification', async (req, res) => {
  const { bookIdentification } = req.params
  database
    .getBook(bookIdentification)
    .then((book) => {
      return res.sendFile(
        path.join(projectFolder, 'books', `${book.title}.epub`),
        {
          headers: {
            'Content-Type': 'application/epub+zip'
          }
        }
      )
    })
    .catch(() => {
      return res.status(404).json({ message: "Couldn't found this book." })
    })
})

app.patch('/language/user/:newLanguage', async (req, res) => {
  const { newLanguage } = req.params
  try {
    database.patchUserLanguage(newLanguage).then(() => {
      res.status(200).json({ message: 'Language successfully updated.' })
    })
  } catch (error) {
    res
      .status(400)
      .json({ message: 'An error occurred while changing user language.' })
  }
})

app.delete('/delete/dictionary/:dictionaryName/:language', async (req, res) => {
  const { dictionaryName, language } = req.params
  try {
    database.deleteDictionary(dictionaryName, language).then(() => {
      return res
        .status(200)
        .json({ message: 'Dictionary successfully deleted.' })
    })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'An error occurred while deleting dictionary.' })
  }
})

app.patch(
  '/language/book/:bookIdentification/:newLanguage', // i am not using it yet
  async (req, res) => {
    const { bookIdentification, newLanguage } = req.params
    try {
      database.patchBookLanguage(bookIdentification, newLanguage).then(() => {
        return res.status(200).json({ message: "Book's language updated." })
      })
    } catch (error) {
      return res
        .status(400)
        .json({ message: "We couldn't update this book's language." })
    }
  }
)

app.get('/translate/:text/:language', async (req, res) => {
  const { text, language } = req.params
  // that's bad, just bad, need to be improved
  const definitions = {
    freedict: false,
    glosbeWords: false,
    glosbeTranslate: false
  }

  definitions.freedict = await dictionaryEntries(language, text)
  if (!definitions.freedict) {
    definitions.glosbeWords = await glosbeWords(language, text)
    if (!definitions.glosbeWords) {
      definitions.glosbeTranslate = await glosbeTranslate(language, text)
    }
  }

  // i dont think i'll use this again, but...
  // if (language === language) {
  //   return res.status(404).json({ message: `You're trying to translate from your native language (${language} to ${language}).` })
  // }

  // if (!database.dicts[language].includes(language)) {
  //   return res.status(404).json({ message: `Augusto don't support this dictionary yet (${language} to ${language}).` })
  // }

  // lol, thats so trash, it has to be improved
  if (
    !definitions.freedict &&
    !definitions.glosbeWords &&
    !definitions.glosbeTranslate
  ) {
    return res.status(404).json({
      message: "We couldn't found some definitions or translations for this."
    })
  } else return res.status(200).json({ ...definitions })
})

// TOOD: create a separate file to lead with dictionaries
app.get('/dictionaries/available/:language', async (req, res) => {
  const { language } = req.params
  const url = encodeURI(
    'https://raw.githubusercontent.com/woistkeller/dictionariesforaugusto/main/dictionaries.json'
  ) // dicitionaries file

  axios(url).then((response) => {
    if (response.data[language]) res.json(response.data[language])
    else {
      res.status(404).json({
        message: "Sorry, We couldn't found any dictionary for this language."
      })
    }
  })
})

app.post('/download/dictionary', async (req, res) => {
  const { dictionaryName, language } = req.body
  try {
    database.addDictionary(dictionaryName, language).then((response) => {
      return res.status(200).json({ ...response })
    })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'An error occurred while downloading dictionary.' })
  }
})

app.post('/progress/book', async (req, res) => {
  const { bookIdentification, progress } = req.body
  database.updateProgress(bookIdentification, progress).then(() => {
    return res.status(200).json({ message: 'Everything went right.' })
  })
})

app.listen(port, () => {
  console.log(`\nWe've taken off 🛫 on ${port} port`)
})

module.exports = projectFolder
