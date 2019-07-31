const homepagestats = require('./check')
const URLS = require('../../config/urls')

const site = 'zeit-de'
const type = 'homepage'
const url = URLS[site][type]

homepagestats.run(site, type, url).then(() => {
    console.log(`Finished homepagestats for ${url}`)
})
