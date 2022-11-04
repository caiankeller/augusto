const database = require('./database')
const shortenLanguage = require('./utils/shortenLanguage')
const axios = require('axios')
const cheerio = require('cheerio')
const { setupCache } = require('axios-cache-adapter')

const cache = setupCache({
  maxAge: 604800000 // 7 days in milliseconds
})

const glosbe = axios.create({
  adapter: cache.adapter
})

// TODO: improve that, now i know how to make a proper promise
const glosbeWords = async (language, word) => {
  return new Promise((resolve) => {
    const userLanguage = shortenLanguage(database.user.language)
    const url = encodeURI(
      `https://glosbe.com/${language}/${userLanguage}/${word.toLowerCase()}`
    )

    // this code can and must be improved
    glosbe(url)
      .then((response) => {
        const $ = cheerio.load(response.data)
        let content = $('.translation__item__phrase').text().trim()
        content = content.split(/\r?\n|\r|\n/g)
        content = content.filter((translation) => translation.length > 0)

        if (content.length) resolve(content)
        else throw Error('Just being a little silly 😎') // ok, i did it because i don't think it matters
      })
      .catch(() => {
        resolve(false)
      })
  })
}

const glosbeTranslate = async (language, text) => {
  return new Promise((resolve, reject) => {
    const userLanguage = shortenLanguage(database.user.language)
    const url = encodeURI(
      `https://translator-api.glosbe.com/translateByLangDetect?sourceLang=${language}&targetLang=${userLanguage}`
    )
    glosbe
      .post(url, text, {
        headers: {
          'Content-Type': 'text/plain'
        }
      })
      .then((response) => {
        resolve(response.data.translation)
      })
      .catch(() => {
        reject(Error)
      })
  })
}

module.exports = { glosbeWords, glosbeTranslate }
