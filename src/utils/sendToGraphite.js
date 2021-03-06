/**
 * Get TODO
 *
 * @param {object} TODO
 * @returns {object} TODO
 */
const graphite = require('graphite')

module.exports = function (metrics) {

  const client = graphite.createClient('plaintext://sitespeed-graphite-data.ops.zeit.de:2003/')
  client.write(metrics, function (error) {
    if (typeof error !== 'undefined') {
      console.error(error)
    }
  })
  client.end()

}
