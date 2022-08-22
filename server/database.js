const data = require("./data.json")
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

const database = ({
    ...data,
    updateFile() { fs.writeFileSync(`${__dirname}/data.json`, JSON.stringify(this, null, 2)) },
    save(title, language) {
        const id = uuidv4()
        const book = { title, language, id, read: 0 }
        this.library = [...this.library, book]
        this.updateFile()
        return book
    },
    delete(id) {
        this.library = this.library.filter(book => book.id !== id)
        this.updateFile()
        return
    },
    get() {
        return { user: this.user, library: [...this.library] }
    },
    getOne(id) {
        return this.library.find(book => book.id === id)
    },
    patchLanguage(id, language) {
        this.library.find(book => book.id === id).language.long = language
        this.updateFile()
        return
    }
})

module.exports = database;