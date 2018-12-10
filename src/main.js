/*
const pa11y = require('pa11y')
const fs = require('fs')
const graphite = require('graphite')

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
    saveRawData(results, siteName, siteType)

    const stats = statsFilter(results)
    const topIssues = topIssuesPerGuidelineFilter(results, 3)
    const numberOfContrastErrors = numberOfSpecificIssueFilter(results, 'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail')

    sendStats(siteName, siteType, stats, topIssues, numberOfContrastErrors)
  }).catch(err => {
    console.error(err)
  })
}

function saveRawData (data, siteName, siteType) {
  fs.writeFileSync(`reports/${siteName}_${siteType}.json`, JSON.stringify(data, null, 4) + '\n')
}

function sendStats (siteName, siteType, stats, topIssues, numberOfContrastErrors) {
  console.log(stats)

  const client = graphite.createClient('plaintext://sitespeed.zeit.de:2003/')

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

  client.write(metrics, function (error) {
    if (typeof error !== 'undefined') {
      console.error(error)
    }
  })
  client.end()
}
*/
