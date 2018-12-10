/**
 * Get the error, notice and warning statistics for a given pa11y result
 *
 * @param {object} The pa11y results
 * @returns {object} Object containing errorCount, warningCount and noticeCount
 */
module.exports = results => {
  return {
    errorCount: results.issues.filter(issue => issue.type === 'error').length,
    warningCount: results.issues.filter(issue => issue.type === 'warning').length,
    noticeCount: results.issues.filter(issue => issue.type === 'notice').length
  }
}
