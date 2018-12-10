const pa11y = require('pa11y')

const saveRawData = require('./../../utils/saveRawData')
const sendToGraphite = require('./../../utils/sendToGraphite')

const statsFilter = require('./filters/stats')
const topIssuesPerGuidelineFilter = require('./filters/topIssuesPerGuideline')
const numberOfSpecificIssueFilter = require('./filters/numberOfSpecificIssue')

exports = module.exports = {}

exports.run = function run (siteName, siteType, url) {

  return pa11y(url, {
    includeNotices: true,
    includeWarnings: true,
    wait: 3000,
    timeout: 60000,
    chromeLaunchConfig: {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    }
  }).then(results => {
    saveRawData(results, `${siteName}_${siteType}_pa11y`)

    const stats = statsFilter(results)
    const topIssues = topIssuesPerGuidelineFilter(results, 3)
    const numberOfContrastErrors = numberOfSpecificIssueFilter(results, 'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail')

    const metrics = {
      a11y: {
        [siteName]: {
          [siteType]: {
            stats,
            topIssues,
            'numberOfContrastErrors': numberOfContrastErrors
          }
        }
      }
    }

    sendToGraphite(metrics)
	// TODO: zentrales console.log, wenn Parameter --verbose gesetzt wurde
	console.log(metrics)

	return metrics
  }).catch(err => {
    console.error(err)
  })
}
