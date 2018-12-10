/**
 * Get the error and info statistics for a given webcoach result
 *
 * @param {object} The webcoach results
 * @returns {object} Object containing different scores
 */
module.exports = results => {
  return {
    accessibilityScore: results.advice.accessibility.score,
    bestpracticeScore: results.advice.bestpractice.score,
    performanceScore: results.advice.performance.score,
    totalScore: results.advice.score
  }
}
