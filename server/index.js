const express = require("express")
const multer = require("multer")
const languageDetect = require("languagedetect")
const database = require("./database.js")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/public/`)
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

const app = express();
const port = 2001
app.use(express.static(`${__dirname}/public/`))

app.post('/book', upload.single("file"), async (req, res) => {
    try {
        const langDetect = new languageDetect()
        langDetect.setLanguageType('iso2')
        //selecting just the most probable language (index [0][0]), return exemple: [["en", 0.9], ["fr", 0.1]]
        const shortLang = langDetect.detect(req.file.originalname)[0][0]
        var longLang
        switch (shortLang) {
            case "en":
                longLang = "english"
                break;
            case "fr":
                longLang = "french"
                break;
            case "de":
                longLang = "german"
                break;
            case "it":
                longLang = "italian"
                break;
            case "es":
                longLang = "spanish"
                break;
            case "pt":
                longLang = "portuguese"
                break;
        }

        const title = req.file.originalname.substring(0, req.file.originalname.lastIndexOf('.'))
        const book = await database.save(title, { short: shortLang, long: longLang })
        return res.status(200).json({ message: "Book uploaded.", book: book })
    } catch (error) {
        return res.status(500).json({ message: "Error while storing book." })
    }
});

app.get('/books', async (req, res) => {
    try {
        if (req.query.book) {
            const book = await database.getOne(req.query.book)
            if (book) return res.status(200).json({ book })
            else return res.status(404).json({ message: "This book has not found." })
        } else {
            const books = await database.get()
            return res.status(200).json({ ...books })
        }
    } catch (error) {
        return res.status(500).json({ message: "Error while getting books." })
    }
})

app.delete('/delete/:book', async (req, res) => {
    try {
        await database.delete(req.params.book)
        return res.status(200).json({ message: "Book deleted." })
    } catch (error) {
        return res.status(500).json({ message: "Error while deleting book." })
    }
})

app.get("/read/:id", (req, res) => {
    const book = database.getOne(req.params.id)
    return res.sendFile(`${__dirname}/public/${book.title}.epub`, {
        headers: {
            "Content-Type": "application/epub+zip"
        }
    })
})

app.patch('/language/:id/:language', async (req, res) => {
    database.patchLanguage(req.params.id, req.params.language)
    return res.status(200).json({ message: "Language updated." })
})

app.listen(port, () => {
    console.log(`We've taken off 🛫 on ${port} port`);
});