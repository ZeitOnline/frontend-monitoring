const cssstats = require('./check')
const URLS = require('../../config/urls')

const site = 'zeit-de'
for (let type in URLS[site]) {
  const url = URLS[site][type]
  cssstats.run(site, type, url).then(() => {
    console.log(`Finished cssstats for ${url}`)
  })
}
