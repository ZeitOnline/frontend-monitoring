/**
 * Get the key scores from a whole lighthouse report
 *
 * @param {object} The lighthouse results
 * @returns {object} Object containing scores
 */
module.exports = results => {
    if (results.categories['lighthouse-plugin-field-performance'] && results.categories['lighthouse-plugin-field-performance'].score ) {
        return {
            accessibilityScore: Math.round(results.categories.accessibility.score * 100),
            bestpracticesScore: Math.round(results.categories['best-practices'].score * 100),
            performanceScore: Math.round(results.categories.performance.score * 100),
            fieldPerformanceScore: Math.round(results.categories['lighthouse-plugin-field-performance'].score * 100),
            seoScore: Math.round(results.categories.seo.score * 100),
            overallScore: Math.round(((results.categories.accessibility.score + results.categories['best-practices'].score + results.categories.performance.score + results.categories['lighthouse-plugin-field-performance'].score + results.categories.seo.score) / 5) * 100)
        }
    } else {
        return {
            accessibilityScore: Math.round(results.categories.accessibility.score * 100),
            bestpracticesScore: Math.round(results.categories['best-practices'].score * 100),
            performanceScore: Math.round(results.categories.performance.score * 100),
            seoScore: Math.round(results.categories.seo.score * 100),
            overallScore: Math.round(((results.categories.accessibility.score + results.categories['best-practices'].score + results.categories.performance.score + results.categories.seo.score) / 4) * 100)
        }
    }
}
