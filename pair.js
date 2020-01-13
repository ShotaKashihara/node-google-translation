const fs = require('fs')

const en = JSON.parse(fs.readFileSync('input/composer.json', 'utf8'))
const ja = JSON.parse(fs.readFileSync('output/composer1.json', 'utf8'))["translations"]
  .map(v => v["translatedText"])
  .map(v => {
    if (v.includes("、")) {
      const s = v.split("、")
      return `${s[1]}・${s[0]}`
    } else {
      return v
    }
  })

const pair = en.reduce((result, current, i) => {
  result[current] = {
    "ja": ja[i]
  }
  return result
}, {})

fs.writeFileSync('output/composer_translation.json', JSON.stringify(pair, null, 2), 'utf8')
