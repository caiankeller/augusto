const shortenLanguage = (language) => {
  switch (language) {
    case 'french': return 'fr'
    case 'english': return 'en'
    case 'german': return 'de'
    case 'portuguese': return 'pt'
    case 'spanish': return 'es'
    case 'italian': return 'it'
    case 'japanese': return 'ja'
    case 'dutch': return 'nl'
    default: return undefined
  }
}

module.exports = shortenLanguage
