const htmlValidator = require('./check')
const URLS = require('../../config/urls')

for (let site in URLS) {
  for (let type in URLS[site]) {
    const url = URLS[site][type]
    htmlValidator.run(site, type, url).then(() => {
      console.log(`Finished html-validator for ${url}`)
    })
  }
}
