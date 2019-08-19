/**
 * Get TODO
 *
 * @param {object} TODO
 * @returns {object} TODO
 */
const graphite = require('graphite')

module.exports = function (metrics) {
  const clientOld = graphite.createClient('plaintext://sitespeed.zeit.de:2003/')
  clientOld.write(metrics, function (error) {
    if (typeof error !== 'undefined') {
      console.error(error)
    }
  })
  clientOld.end()

  const clientNew = graphite.createClient('plaintext://10.110.16.26:2003/')
  clientNew.write(metrics, function (error) {
    if (typeof error !== 'undefined') {
      console.error(error)
    }
  })
  clientNew.end()


}
