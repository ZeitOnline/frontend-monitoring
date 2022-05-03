const jsdom = require('jsdom')
const { JSDOM } = jsdom
const CONFIG = require('../../config/config')

const saveRawData = require('./../../utils/saveRawData')
const sendToGraphite = require('./../../utils/sendToGraphite')

const statsFilter = require('./filters/stats')

exports = module.exports = {}

exports.run = function run (label, url) {
  const resourceLoader = new jsdom.ResourceLoader({
    userAgent: CONFIG.userAgent
  })

  const options = {
    includeNodeLocations: true,
    storageQuota: 10000000,
    resources: resourceLoader
  }

  return JSDOM.fromURL(url, options).then(dom => {
    const stats = statsFilter(dom)

    // currently (dec 2020) we have some trouble with the graphite buckets,
    // so I put the data into two of them until it works
    const metrics = {
      frontendmonitoring: {
        adplaces: {
          [label]: {
            stats
          }
        }
      }
    }
    sendToGraphite(metrics)


    saveRawData(stats, `zeit_${label}_adplaces`)
    // TODO: zentrales console.log, wenn Parameter --verbose gesetzt wurde
    // console.log(metrics)

    return metrics
  })
    .catch((error) => {
      console.error(error)
    })
}
