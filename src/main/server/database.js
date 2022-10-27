const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const os = require('os')
const path = require('path')
const https = require('https')
const axios = require('axios')
const convertBytes = require('./utils/convertBytes')

const projectFolder = path.join(os.homedir(), 'Documents', 'augusto') // declaring the project folder

const database = {
  ...JSON.parse(fs.readFileSync(path.join(projectFolder, 'data.json'))),
  updateFile () {
    fs.writeFileSync(
      path.join(projectFolder, 'data.json'),
      JSON.stringify(this, null, 2)
    )
  },
  saveBook (title, language) {
    return new Promise((resolve) => {
      const id = uuidv4()
      const book = { title, language, id, read: { cfi: '', percentage: 0 } }
      this.library = [...this.library, book]
      this.updateFile()
      resolve(book)
    })
  },
  deleteBook (bookIdentification) {
    return new Promise((resolve, reject) => {
      fs.unlink(
        path.join(
          projectFolder,
          'books',
          `${
            this.library.find((book) => book.id === bookIdentification).title
          }.epub`
        ),
        (error) => {
          if (error) return reject(new Error('Error while trying delete book.'))
          this.library = this.library.filter(
            (book) => book.id !== bookIdentification
          )
          this.updateFile()
          return resolve()
        }
      )
    })
  },
  addDictionary (dictionaryName, language) {
    return new Promise((resolve, reject) => {
      const dictionariesFolder = path.join(
        os.homedir(),
        'Documents',
        'augusto',
        'dictionaries'
      )

      const url = encodeURI(
        `https://raw.githubusercontent.com/woistkeller/dictionariesforaugusto/main/${dictionaryName}.json`
      )

      https.get(url, (response) => {
        const pathDictionary = path.join(
          dictionariesFolder,
          `${dictionaryName}.json`
        )
        const filePath = fs.createWriteStream(pathDictionary)
        response.pipe(filePath)

        filePath.on('finish', async () => {
          const url = encodeURI(
            'https://raw.githubusercontent.com/woistkeller/dictionariesforaugusto/main/dictionaries.json'
          ) // dicitionaries file
          axios(url).then((response) => {
            const dictionary = response.data[language].find(
              (dictionary) => dictionary.name === dictionaryName
            )
            dictionary.size = convertBytes(filePath.bytesWritten)
            filePath.close()

            // that is ugly af i am rly ashamed
            let toAppend
            if (this.dictionaries[language]) {
              toAppend = {
                [language]: [...this.dictionaries[language], { ...dictionary }]
              }
            } else {
              toAppend = { [language]: [dictionary] }
            }

            this.dictionaries = {
              ...this.dictionaries,
              ...toAppend
            }
            this.updateFile()
            resolve({ dictionary, language })
          })
        })
      })
    })
  },
  deleteDictionary (dictionaryName, language) {
    return new Promise((resolve, reject) => {
      const dictionaryFolder = path.join(
        os.homedir(),
        'Documents',
        'augusto',
        'dictionaries',
        `${dictionaryName}.json`
      )
      fs.unlink(dictionaryFolder, (err) => {
        if (err) {
          return reject(new Error('Error while trying delete dictionary.'))
        }

        this.dictionaries = {
          ...this.dictionaries,
          [language]: [
            ...this.dictionaries[language].slice(
              0,
              this.dictionaries[language].findIndex(
                (dictionary) => dictionary.name === dictionaryName
              )
            ),
            ...this.dictionaries?.[language].slice(
              this.dictionaries[language].findIndex(
                (dictionary) => dictionary.name === dictionaryName
              ) + 1
            )
          ]
        }
        this.updateFile()
        resolve()
      })
    })
  },
  getAll () {
    return new Promise((resolve) => {
      return resolve({
        user: this.user,
        library: [...this.library],
        dictionaries: this.dictionaries
      })
    })
  },
  patchUserLanguage (newLanguage) {
    return new Promise((resolve) => {
      this.user = { ...this.user, language: newLanguage }
      this.updateFile()
      resolve()
    })
  },
  getBook (bookIdentification) {
    return new Promise((resolve, reject) => {
      const book = this.library.find((book) => book.id === bookIdentification)
      if (book) resolve(book)
      else reject(new Error("Couldn't found this book."))
    })
  },
  patchBookLanguage (bookIdentification, newLanguage) {
    // i actually dont use it yet, that is not ready to go
    return new Promise((resolve) => {
      this.library.find(
        (book) => book.id === bookIdentification
      ).language.long = newLanguage
      this.updateFile()
      resolve()
    })
  },
  updateProgress (bookIdentification, progress) {
    return new Promise((resolve) => {
      this.library.find((book) => book.id === bookIdentification).read =
        progress
      this.updateFile()
      resolve()
    })
  }
}

module.exports = database
