/**
 * Get TODO
 *
 * @param {object} TODO
 * @returns {object} TODO
 */
const fs = require('fs')

module.exports = function (data, filename) {
    const filePath = `reports/${filename}.json`
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4) + '\n')
    return filePath
}
