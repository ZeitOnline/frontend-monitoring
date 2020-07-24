const cssstats = require('./check')
const URLS = require('../../config/urls')

for (const site in URLS) {
  if (site.indexOf('zeit-') !== 0) {
    continue
  }
  for (const type in URLS[site]) {
    const url = URLS[site][type]
    cssstats.run(site, type, url).then(() => {
      console.log(`Finished cssstats for ${url}`)
    })
  }
}
