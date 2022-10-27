const database = require('./database')
const shortenLanguage = require('./utils/shortenLanguage')
const axios = require('axios')
const cheerio = require('cheerio')

// TODO: improve that, now i know how to make a proper promise
const glosbeWords = async (language, word) => {
  return new Promise((resolve) => {
    const language = shortenLanguage(database.user.language)
    const url = encodeURI(
      `https://glosbe.com/${language}/${language}/${word.toLowerCase()}`
    )

    // this code can and must be improved
    axios(url)
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
  return new Promise((resolve) => {
    const language = shortenLanguage(database.user.language)
    const url = encodeURI(
      `https://translate.glosbe.com/${language}-${language}/${text.trim()}`
    )
    axios(url)
      .then((response) => {
        const $ = cheerio.load(response.data)
        const content = [$('app-page-translator-translation-output').text()]
        if (content.length) resolve(content)
        else throw Error('Just being a little silly 😎') // ok, i really thing that's funnier than writting an actually error message
      })
      .catch(() => {
        resolve(false)
      })
  })
}

module.exports = { glosbeWords, glosbeTranslate }