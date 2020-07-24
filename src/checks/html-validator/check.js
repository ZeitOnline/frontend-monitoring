const validator = require('html-validator')

const saveRawData = require('./../../utils/saveRawData')
const sendToGraphite = require('./../../utils/sendToGraphite')

const statsFilter = require('./filters/stats')

exports = module.exports = {}

exports.run = function run (siteName, siteType, url) {
  return validator({
    url: url,
    headers: { 'user-agent': 'ZONFrontendMonitoring' }
  }).then((results) => {
    const stats = statsFilter(JSON.parse(results))

    saveRawData(results, `${siteName}_${siteType}_htmlvalidator`)

    const metrics = {
      htmlvalidator: {
        [siteName]: {
          [siteType]: {
            stats
          }
        }
      }
    }

    sendToGraphite(metrics)
    // TODO: zentrales console.log, wenn Parameter --verbose gesetzt wurde
    // console.log(metrics)

    return metrics
  })
    .catch((error) => {
      console.error(error)
    })
}
