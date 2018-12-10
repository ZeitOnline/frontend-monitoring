/**
 * Get the top n guidelines with the most issues (warning, error or notice)
 * for the given pa11y results.
 *
 * @param {object} results The pa11y results
 * @param {string} issueString Pa11y code of the issue to be counted
 * @returns {Integer} Number of found issues
 */
module.exports = (results, issueString) => {
  return results.issues.filter(issue => issue.code === issueString).length
}
