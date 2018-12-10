
/**
 * Get the top n guidelines with the most issues (warning, error or notice)
 * for the given pa11y results.
 *
 * @param {object} results The pa11y results
 * @param {number} count Maximum number of guidelines to return
 * @returns {Map} A sorted map of the top n issues
 */
module.exports = (results, top) => {
  const guidelineMap = new Map()

  results.issues.forEach(issue => {
    // Transform code string to array, for example:
    // Input: 'WCAG2AA.Principle2.Guideline2_4.2_4_1.H64.1'
    // Result: [ 'WCAG2AA', 'Principle2', 'Guideline2_4', '2_4_1', 'H64', '1' ]
    const splittedCodes = issue.code.match(/([^.]+)/g)
    const guideline = splittedCodes[2]

    guidelineMap.set(guideline, guidelineMap.get(guideline) + 1 || 1)
  })

  const sortedGuidelines = [...guidelineMap.entries()].sort((a, b) => {
    return a[1] < b[1] // sort by guidline occurence
  })

  // return new Map(sortedGuidelines.slice(0, top))

  // via http://2ality.com/2015/08/es6-map-json.html
  function strMapToObj (strMap) {
    let obj = Object.create(null)
    for (let [k, v] of strMap) {
      // We don’t escape the key '__proto__'
      // which can cause problems on older engines
      obj[k] = v
    }
    return obj
  }

  const strMap = new Map(sortedGuidelines.slice(0, top))
  return strMapToObj(strMap)
}
