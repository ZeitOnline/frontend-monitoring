const webcoach = require('webcoach')
const statsFilter = require('./filters/stats')

exports = module.exports = {}

exports.run = function run (siteName, siteType, url, mobile=false) {
	// TODO: options like mobile:true (https://github.com/sitespeedio/coach/blob/e3119801c2fca28803a8de484b75aa267f0f5f34/lib/cli.js)
	return webcoach.run(
		url
	)
	.then((results) => {
		const stats = statsFilter(results)

		saveRawData(results, `${siteName}_${siteType}_webcoach`)
		
	    const metrics = {
	      webcoach: {
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
	}).catch((error) => {
		console.error(error)
	})
}
