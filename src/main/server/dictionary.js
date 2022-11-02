const database = require('./database')
const fs = require('fs')
const path = require('path')
const os = require('os')
const lengthenLanguage = require('./utils/lengthenLanguage')

// this not gonna work in bigger dictionaries files, need be improved
// anyway, this looks awful

const dictionaryEntries = (language, word) => {
  const string = word
  const userLanguage = database.user.language
  const languageLengthened = lengthenLanguage(language)
  const dictionaryFileName = `${languageLengthened}-${userLanguage}.json`
  const projectFolder = path.join(os.homedir(), 'Documents', '.augusto') // declaring the project folder
  const dictsFolder = path.join(
    projectFolder,
    'dictionaries',
    dictionaryFileName
  )

  let dictionary
  try {
    dictionary = fs.readFileSync(dictsFolder)
  } catch (error) {
    return false
  }
  dictionary = JSON.parse(dictionary.toString())

  const definitions = []
  const lightSearchResults = search(dictionary, string)
  if (lightSearchResults) definitions.push(lightSearchResults)
  else {
    const deepSearchResults = deepSearch(dictionary, string)
    if (deepSearchResults) definitions.push(deepSearchResults)
  }

  if (definitions.length) return definitions
  else return false
}

const deepSearch = (dictionary, string) => {
  let result
  let query = string
  let i = 0

  while (i < query.length / 2) {
    query = query.slice(0, query.length - i++) // removing a letter from the end of the string
    if (dictionary[query]) result.push(dictionary[query])
  }

  return result
}

const search = (dictionary, string) => {
  let query = string
  let i = 0
  let result

  while (i < query.length / 2) {
    query = query.slice(0, query.length - i++) // removing a letter from the end of the string
    if (!dictionary[query]) continue
    else result = dictionary[query]
    break
  }

  return result
}

// this code is not ready to go, thins have changed
// function accentReadySearch (dictionary, string) {
//   function cleanText (string) { // it removes the apostrophe and other accents
//     return string.slice(string.indexOf("'") + 1).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
//   }

//   const result = []; let word = cleanText(string); let i = 0

//   while (i < word.length / 2) {
//     word = word.slice(0, word.length - i++) // removing a letter from the end of the string
//     for (const entry in dictionary) {
//       console.log(result)
//       if (!dictionary[entry]) continue
//       if (cleanText(dictionary[entry].orth) === string) result.push(dictionary[entry])
//     }
//   }

//   return result
// }

module.exports = dictionaryEntries
