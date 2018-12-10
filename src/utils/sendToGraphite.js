/**
 * Get TODO
 *
 * @param {object} TODO
 * @returns {object} TODO
 */
const graphite = require('graphite')

module.exports = function (metrics) {
  const client = graphite.createClient('plaintext://sitespeed.zeit.de:2003/')
  client.write(metrics, function (error) {
    if (typeof error !== 'undefined') {
      console.error(error)
    }
  })
  client.end()
}
