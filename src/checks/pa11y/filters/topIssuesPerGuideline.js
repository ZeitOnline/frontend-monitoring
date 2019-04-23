/**
 * Get the top n guidelines with the most issues (warning, error or notice)
 * for the given pa11y results.
 *
 * @param {object} results The pa11y results
 * @param {number} count Maximum number of guidelines to return
 * @returns {Map} A sorted map of the top n issues
 */

const GUIDELINES_TRANSLATION = {
    'Guideline1_1': 'Guideline 1.1: Text Alternatives (Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language.)',
    'Guideline1_2': 'Guideline 1.2: Time-based Media (Provide alternatives for time-based media.)',
    'Guideline1_3': 'Guideline 1.3: Adaptable (Create content that can be presented in different ways (for example simpler layout) without losing information or structure.)',
    'Guideline1_4': 'Guideline 1.4: Distinguishable (Make it easier for users to see and hear content including separating foreground from background. )',
    'Guideline2_1': 'Guideline 2.1: Keyboard Accessible (Make all functionality available from a keyboard.)',
    'Guideline2_2': 'Guideline 2.2: Enough Time (Provide users enough time to read and use content.)',
    'Guideline2_3': 'Guideline 2.3: Seizures (Do not design content in a way that is known to cause seizures.)',
    'Guideline2_4': 'Guideline 2.4: Navigable (Provide ways to help users navigate, find content, and determine where they are.)',
    'Guideline3_1': 'Guideline 3.1: Readable (Make text content readable and understandable.)',
    'Guideline3_2': 'Guideline 3.2: Predictable (Make Web pages appear and operate in predictable ways.)',
    'Guideline3_3': 'Guideline 3.3: Input Assistance (Help users avoid and correct mistakes.)',
    'Guideline4_1': 'Guideline 4.1: Compatible (Maximize compatibility with current and future user agents, including assistive technologies.)'
}

const GUIDELINES_TRANSLATION_SIMPLE = {
    'Guideline1_1': 'Guideline1_1__Text_Alternatives',
    'Guideline1_2': 'Guideline1_2__Time_based_Media',
    'Guideline1_3': 'Guideline1_3__Adaptable',
    'Guideline1_4': 'Guideline1_4__Distinguishable',
    'Guideline2_1': 'Guideline2_1__Keyboard_Accessible',
    'Guideline2_2': 'Guideline2_2__Enough_Time',
    'Guideline2_3': 'Guideline2_3__Seizures',
    'Guideline2_4': 'Guideline2_4__Navigable',
    'Guideline3_1': 'Guideline3_1__Readable',
    'Guideline3_2': 'Guideline3_2__Predictable',
    'Guideline3_3': 'Guideline3_3__Input_Assistance',
    'Guideline4_1': 'Guideline4_1__Compatible'
}

module.exports = (results, top) => {
  const guidelineMap = new Map()

  results.issues.forEach(issue => {
    // Transform code string to array, for example:
    // Input: 'WCAG2AA.Principle2.Guideline2_4.2_4_1.H64.1'
    // Result: [ 'WCAG2AA', 'Principle2', 'Guideline2_4', '2_4_1', 'H64', '1' ]
    const splittedCodes = issue.code.match(/([^.]+)/g)
    const guideline = splittedCodes[2]
    const guidelineTranslation = GUIDELINES_TRANSLATION_SIMPLE[guideline] || guideline

    guidelineMap.set(guidelineTranslation, guidelineMap.get(guidelineTranslation) + 1 || 1)
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
