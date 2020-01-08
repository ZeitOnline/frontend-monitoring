const hint = require('hint');
const analyzer = hint.Analyzer;
// const webhint = require('./check')
const URLS = require('../../config/urls')

const webhint = analyzer.create({
    "extends": ["web-recommended"]
})

webhint.analyze('https://www.zeit.de/index').then( res => {
    console.log(res)

}).catch(err => {
    console.log(err)
})



// const site = 'zeit-de'
// for (let type in URLS[site]) {
//   const url = URLS[site][type]
//   cssstats.run(site, type, url).then(() => {
//     console.log(`Finished cssstats for ${url}`)
//   })
// }
