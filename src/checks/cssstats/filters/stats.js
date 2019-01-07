/**
 * Get the error, notice and warning statistics for a given cssstats result
 *
 * @param {object} The cssstats results
 * @returns {object} Object containing ...
 */
module.exports = results => {
  return {
    size: results.size,
    gzipSize: results.gzipSize,
    numberOfRules: results.rules.total,
    numberOfSelectors: results.selectors.total,
    numberOfDeclarations: results.declarations.total,
    numberOfDifferentFontSizes: results.declarations.getAllFontSizes().unique().length,
    averageSpecificity: results.selectors.specificity.average,
    maxSpecificity: results.selectors.specificity.max
  }
}

// https://coderwall.com/p/nilaba/simple-pure-javascript-array-unique-method-with-5-lines-of-code
Array.prototype.unique = function() {
  return this.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
}
