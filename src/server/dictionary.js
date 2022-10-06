const database = require('./database')
const fs = require('fs')
const path = require('path')

// this not gonna work in bigger dictionaries files, need be improved
// anyway, this look awful

const dictionaryEntries = (language, word) => {
  const string = word.toLowerCase()
  const { defaultLanguage } = database.user
  const dictionaryFileName = `${language}-${defaultLanguage}.json`

  let dictionary
  try {
    dictionary = fs.readFileSync(path.join(__dirname, 'dicts', dictionaryFileName))
  } catch (error) { return }
  dictionary = JSON.parse(dictionary.toString())

  const definitions = []
  definitions.push(search(dictionary, string))
  definitions.push(...deepSearch(dictionary, string))
  return definitions
}

function deepSearch (dictionary, string) {
  const result = []; let word = string; let i = 0

  while (i < word.length / 2) {
    word = word.slice(0, word.length - i++) // removing a letter from the end of the string
    if (dictionary[word]) result.push(dictionary[word])
  }

  return result
}

function search (dictionary, string) {
  let word = string; let i = 0; let result

  while (i < word.length / 2) {
    word = word.slice(0, word.length - i++) // removing a letter from the end of the string
    if (!dictionary[word]) continue
    else result = dictionary[word]; break
  }

  return result
}

function accentReadySearch (dictionary, string) {
  function cleanText (string) { // it removes the apostrophe and other accents
    return string.slice(string.indexOf("'") + 1).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  const result = []; let word = cleanText(string); let i = 0

  while (i < word.length / 2) {
    word = word.slice(0, word.length - i++) // removing a letter from the end of the string
    for (const entry in dictionary) {
      console.log(result)
      if (!dictionary[entry]) continue
      if (cleanText(dictionary[entry].orth) === string) result.push(dictionary[entry])
    }
  }

  return result
}

module.exports = dictionaryEntries
