/**
 * Get the error and info statistics for a given html-validator result
 *
 * @param {object} The html-validator results
 * @returns {object} Object containing errorCount and infoCount
 */
module.exports = results => {
  return {
    errorCount: results.messages.filter(message => message.type === 'error').length,
    infoCount: results.messages.filter(message => message.type === 'info').length
  }
}
