// const fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const validator = require('html-validator')
const CONFIG = require('../../config/config')

const saveRawData = require('./../../utils/saveRawData')
const sendToGraphite = require('./../../utils/sendToGraphite')

const statsFilter = require('./filters/stats')

exports = module.exports = {}

exports.run = async function run(siteName, siteType, url) {

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'User-Agent': CONFIG.userAgent
        }
    });
    const html = await response.text()

    return validator({
            data: html,
        }).then((results) => {
            const stats = statsFilter(results)

            saveRawData(results, `${siteName}_${siteType}_htmlvalidator`)

            const metrics = {
              frontendmonitoring: {
                htmlvalidator: {
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

            return metrics
        })
        .catch((error) => {
            console.error(error)
        })
}
