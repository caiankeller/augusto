const database = require('./database')
const shortenLanguage = require('./utils/shortenLanguage')
const axios = require('axios')
const cheerio = require('cheerio')

const glosbe = async (language, word) => {
  return new Promise(resolve => {
    const { defaultLanguage } = database.user
    const defaultLanguageShortened = shortenLanguage(defaultLanguage)
    const toTranslateLanguage = shortenLanguage(language)

    const url = encodeURI(`https://glosbe.com/${toTranslateLanguage}/${defaultLanguageShortened}/${word.toLowerCase()}`)
    // this code can and must be improved

    axios(url).then(response => {
      const $ = cheerio.load(response.data)
      let content = $('.translation__item__phrase').text().trim()
      content = content.split(/\r?\n|\r|\n/g)
      content = content.filter((translation) => translation.length > 0)
      resolve(content)
    }).catch(() => { resolve([]) })
  })
}

module.exports = glosbe
