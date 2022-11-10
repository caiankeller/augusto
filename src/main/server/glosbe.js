const database = require('./database')
const shortenLanguage = require('./utils/shortenLanguage')
const axios = require('axios')
const cheerio = require('cheerio')
const { setupCache } = require('axios-cache-adapter')

const cache = setupCache({
  maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days in milliseconds, however, i am saving it nowhere,
  // so, when the app is closed, bum, bye bye cache
})

const glosbe = axios.create({
  adapter: cache.adapter
})

// TODO: improve that, now i know how to make a proper promise
const glosbeWords = async (language, word) => {
  return new Promise((resolve, reject) => {
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
        else throw Error()
      })
      .catch(() => {
        reject(Error("Couldn't found any definition."))
      })
  })
}

const glosbeTranslate = async (language, word) => {
  return new Promise((resolve, reject) => {
    const userLanguage = shortenLanguage(database.user.language)

    glosbe
      .post(
        'https://translator-api.glosbe.com/translateByLangWithScore',
        word,
        {
          params: {
            sourceLang: language,
            targetLang: userLanguage
          },
          headers: {
            Accept: '*/*',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            Referer: 'https://glosbe.com/',
            'Content-Type': 'text/plain;charset=UTF-8',
            Origin: 'https://glosbe.com',
            Connection: 'keep-alive',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'Sec-GPC': '1',
            TE: 'trailers'
          }
        }
      )
      .then((response) => {
        resolve(response.data.translation)
      })
      .catch(() => {
        reject(Error('Error while looking for translations.'))
      })
  })
}

module.exports = { glosbeWords, glosbeTranslate }
