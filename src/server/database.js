const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')
const os = require('os')
// what am i doing wrong?
// const { augustoFolder } = require("../src/main")
const augustoFolder = path.join(os.homedir(), 'Documents', 'AugustoTest')
const data = JSON.parse(fs.readFileSync(path.join(augustoFolder, 'data.json')))

const database = {
  ...data,
  updateFile () {
    fs.writeFileSync(path.join(augustoFolder, 'data.json'), JSON.stringify(this, null, 2))
  },
  save (title, language) {
    const id = uuidv4()
    const book = { title, language, id, read: { cfi: '', percentage: 0 } }
    this.library = [...this.library, book]
    this.updateFile()
    return book
  },
  delete (id) {
    this.library = this.library.filter((book) => book.id !== id)
    this.updateFile()
  },
  addDictionary (dictionary) {
    if (this.dictionaries[dictionary.language]) {
      this.dictionaries = { ...this.dictionaries, [dictionary.language]: [...this.dictionaries[dictionary.language], { ...dictionary }] }
    } else this.dictionaries = { ...this.dictionaries, [dictionary.language]: [{ ...dictionary }] } // i wanted to make it different, cooler, but webpack >:C
    this.updateFile()
  },
  getAll () {
    return { user: this.user, library: [...this.library], dictionaries: this.dictionaries }
  },
  changeUserDefaultLanguage (language) {
    this.user = { ...this.user, defaultLanguage: language }
    this.updateFile()
  },
  getOne (id) {
    return this.library.find((book) => book.id === id)
  },
  patchLanguage (id, language) {
    this.library.find((book) => book.id === id).language.long = language
    this.updateFile()
  },
  updateProgress (id, progress) {
    this.library.find((book) => book.id === id).read = progress
    this.updateFile()
  }
}

module.exports = database
