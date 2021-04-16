const cssstats = require('./check')
const URLS = require('../../config/urls')

async function wrapper() {

for (const site in URLS) {
  if (site.indexOf('zeit-') !== 0) {
    continue
  }
  for (const type in URLS[site]) {
    const url = URLS[site][type]
    await cssstats.run(site, type, url).then(() => {
      console.log(`Finished unused-css-js for ${url}`)
    });
  }
}

}

wrapper();
