const puppeteer = require('puppeteer')

const saveRawData = require('./../../utils/saveRawData')
const sendToGraphite = require('./../../utils/sendToGraphite')

const statsFilter = require('./filters/stats')
const CONFIG = require('../../config/config')

exports = module.exports = {}

exports.run = function run (siteName, siteType, url) {

    return (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        page.setUserAgent(CONFIG.userAgent)

        await Promise.all([
            page.coverage.startJSCoverage(),
            page.coverage.startCSSCoverage()
        ]);

        await page.goto(url);

        //Retrive the coverage objects
        const [jsCoverage, cssCoverage] = await Promise.all([
            page.coverage.stopJSCoverage(),
            page.coverage.stopCSSCoverage(),
        ]);

        sendToGraphite({
          frontendmonitoring: {
              cssCoverage: {
                [siteName]: {
                  [siteType]: statsFilter(cssCoverage)
                }
              }
          }
        })
        //console.log('css Coverage: ', statsFilter(cssCoverage))

        sendToGraphite({
          frontendmonitoring: {
              jsCoverage: {
                [siteName]: {
                  [siteType]: statsFilter(jsCoverage)
                }
              }
          }
        })
        //console.log('js Coverage: ', statsFilter(jsCoverage))


        saveRawData(cssCoverage, `${siteName}_${siteType}_cssCoverage`)
        saveRawData(jsCoverage, `${siteName}_${siteType}_jsCoverage`)

        await browser.close();
    })().catch(function (error) {
      console.error(error)
    });

/*

  return getCss(url, {
    headers: {
      'User-Agent':
    }
  }).then(function (response) {
    const css = getCompleteCss(response.links)

    const results = cssStats(css, {
      mediaQueries: false,
      importantDeclarations: true
    })

    const stats = statsFilter(results)

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
    */
}
