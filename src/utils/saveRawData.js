/**
 * Get TODO
 *
 * @param {object} TODO
 * @returns {object} TODO
 */
const fs = require('fs')

module.exports = function (data, filename) {
    fs.writeFileSync(`reports/${filename}.json`, JSON.stringify(data, null, 4) + '\n')
    // TODO: return den neuen kompletten Dateinamen
    return filename
}
