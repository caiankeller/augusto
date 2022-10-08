const lengthenLanguage = (language) => {
  switch (language) {
    case 'fr': return 'french'
    case 'en': return 'english'
    case 'de': return 'german'
    case 'pt': return 'portuguese'
    case 'es': return 'spanish'
    case 'it': return 'italian'
    case 'ja': return 'japanese'
    case 'nl': return 'dutch'
    default: return undefined
  }
}

module.exports = lengthenLanguage
