const getCss = require('get-css');
const cssStats = require('cssstats')
exports = module.exports = {}

exports.run = function run (siteName, siteType, url) {

    return getCss(url)
      .then(function(response) {
        const css = getCompleteCss(response.links);

        stats = cssStats(css, {
            mediaQueries: false
        });
        console.log( 'Rules: ' + stats.rules.total );
        console.log( 'Different Font Sizes: ' + stats.declarations.getAllFontSizes().unique().length );

      })
      .catch(function(error) {
        console.error(error);
      });

}

function getCompleteCss(files) {
    let cssList = [];
    for ( const file of files ) {
        if (file.url.startsWith('https://static.zeit.de/assets/') && !file.url.endsWith('print.css')) {
            cssList.push(file.css)
        }
    }
    return cssList.join('\n');
}

// https://coderwall.com/p/nilaba/simple-pure-javascript-array-unique-method-with-5-lines-of-code
Array.prototype.unique = function() {
  return this.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
}
