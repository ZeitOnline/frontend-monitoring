const puppeteer = require('puppeteer')

const saveRawData = require('./../../utils/saveRawData')
const sendToGraphite = require('./../../utils/sendToGraphite')

const statsFilter = require('./filters/stats')
const CONFIG = require('../../config/config')

async function run(siteName, siteType, url) {
    try {
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        page.setUserAgent(CONFIG.userAgent);
        await page.setDefaultNavigationTimeout(0);

        await Promise.all([
            page.coverage.startJSCoverage(),
            page.coverage.startCSSCoverage()
        ]);

        await page.goto(url);

        const [jsCoverage, cssCoverage] = await Promise.all([
            page.coverage.stopJSCoverage(),
            page.coverage.stopCSSCoverage(),
        ]);

        sendToGraphite({
          frontendmonitoring: {
              cssCoverage: {
                [siteName]: {
                  [siteType]: statsFilter(cssCoverage)
                },
              },

              jsCoverage: {
                [siteName]: {
                  [siteType]: statsFilter(jsCoverage)
                }
              }
          }
        })
        //console.log('css Coverage: ', statsFilter(cssCoverage))
        //console.log('js Coverage: ', statsFilter(jsCoverage))

        saveRawData(cssCoverage, `${siteName}_${siteType}_cssCoverage`)
        saveRawData(jsCoverage, `${siteName}_${siteType}_jsCoverage`)

        await browser.close();
    } catch (error) {
      console.log(error)
    };
}

module.exports = {
  run,
};
