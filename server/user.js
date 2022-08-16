const user = require("./user.json")
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

const database = ({
    ...user,
    save(title, language) {
        const id = uuidv4()
        const book = { title, language, id }
        this.library = [...this.library, book]
        fs.writeFileSync(`${__dirname}/user.json`, JSON.stringify(this, null, 2))

        return book
    },
    delete(id) {
        this.library.filter(book => book.id !== id)
        fs.writeFileSync(`${__dirname}/user.json`, JSON.stringify(this, null, 2))

        return
    },
    get() {
        return { user: this.user, library: [...this.library] }
    },
    getOne(id) {
        return this.library.find(book => book.id === id)
    },
    patchLanguage(id, language) {
        this.library.find(book => book.id === id).language = language
        fs.writeFileSync(`${__dirname}/user.json`, JSON.stringify(this, null, 2))

        return
    }
})

module.exports = database;