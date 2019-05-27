const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher');

const saveRawData = require('./../../utils/saveRawData')
const sendToGraphite = require('./../../utils/sendToGraphite')

const statsFilter = require('./filters/stats')

const optionsWithFieldPerformancePlugin = {
    chromeFlags: ['--headless'],
    plugins: ['lighthouse-plugin-field-performance']
}

const optionsWithoutFieldPerformancePlugin = {
    chromeFlags: ['--headless']
}

function launchChromeAndRunLighthouse(url, options, config = null) {
  return chromeLauncher.launch({chromeFlags: options.chromeFlags}).then(chrome => {
    options.port = chrome.port;
    return lighthouse(url, options, config).then(results => {
      // use results.lhr for the JS-consumeable output
      // https://github.com/GoogleChrome/lighthouse/blob/master/types/lhr.d.ts
      // use results.report for the HTML/JSON/CSV output as a string
      // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
      return chrome.kill().then(() => results.lhr)
    });
  });
}

exports = module.exports = {}

exports.run = function run (siteName, siteType, url) {

    let options = optionsWithoutFieldPerformancePlugin;
    if (siteType == 'homepage') {
        options = optionsWithFieldPerformancePlugin;
    }

    return launchChromeAndRunLighthouse(url, options).then(results => {
        const stats = statsFilter(results)
        saveRawData(results, `${siteName}_${siteType}_lighthouse`)

        const metrics = {
          lighthouse: {
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
    }).catch( error => {
        console.error(error)
    })

}
