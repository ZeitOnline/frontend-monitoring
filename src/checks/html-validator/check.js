const validator = require('html-validator')
const statsFilter = require('./filters/stats')

exports = module.exports = {}

exports.run = function run (siteName, siteType, url) {

	return validator({
		url: url
	})
	.then((results) => {
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
		console.log(matrics)

		return metrics
	})
	.catch((error) => {
		console.error(error)
	})
}
