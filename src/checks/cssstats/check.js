const getCss = require('get-css')
const cssStats = require('cssstats')

const saveRawData = require('./../../utils/saveRawData')
const sendToGraphite = require('./../../utils/sendToGraphite')

const statsFilter = require('./filters/stats')
const CONFIG = require('../../config/config')

exports = module.exports = {}

exports.run = function run (siteName, siteType, url) {
  return getCss(url, {
    headers: {
      'User-Agent': CONFIG.userAgent
    }
  }).then(function (response) {
    const css = getCompleteCss(response.links)

    const results = cssStats(css, {
      mediaQueries: false,
      importantDeclarations: true
    })

    const stats = statsFilter(results)

    // currently (dec 2020) we have some trouble with the graphite buckets,
    // so I put the data into two of them until it works
    const metrics = {
      frontendmonitoring: {
          cssstats: {
            [siteName]: {
              [siteType]: {
                stats
              }
            }
          }
      }
    }
    sendToGraphite(metrics)

    // TODO: zentrales console.log, wenn Parameter --verbose gesetzt wurde
    // console.log(metrics)

    saveRawData(results, `${siteName}_${siteType}_cssstats`)

    return metrics
  })
    .catch(function (error) {
      console.error(error)
    })
}

function getCompleteCss (files) {
  const cssList = []
  for (const file of files) {
    if (file.url.startsWith('https://static.zeit.de/p/') && !file.url.endsWith('print.css')) {
      cssList.push(file.css)
    }
  }
  return cssList.join('\n')
}
