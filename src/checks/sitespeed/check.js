const sitespeed = require('sitespeed.io/lib/sitespeed')

// const saveRawData = require('./../../utils/saveRawData')
// const sendToGraphite = require('./../../utils/sendToGraphite')

exports = module.exports = {}

exports.run = async function run (urls) {
  let options = {
    config: './src/config/sitespeed.json',
    urls: urls
  }

  sitespeed.run(options).then((results) => {
    console.log(results)
  }).catch(err => {
    console.log(err)
  })
}
