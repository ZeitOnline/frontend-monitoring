const validator = require('cssstats')
exports = module.exports = {}

exports.run = function run (siteName, siteType, url) {
    // TODO: cssstats ist nicht asynchron. Da wir aber draußen in der 
    // index.js eine Promise erwarten (muss man nicht machen, aber für 
    // die Konsistenz wäre das gut), müssen wir das hier wrappen und eine 
    // Promise zurückgeben.
	return validator({
		url: url
	})
	.then((results) => {
		console.log(results)
		return {}
	})
	.catch((error) => {
		console.error(error)
	})
}


// TODO: größere Herausforderung ... cssstats nimmt nur lokale CSS-Dateien 
// entgegen. Die Website cssstats.com nimmt eine URL, und sammelt dort alle 
// CSS unter derselben Domain zusammen, und analysiert die. Diesen Schritt 
// müssen wir hier nachbauen (oder den Code finden mit dem sie das machen).
// :tada: https://github.com/cssstats/get-css
// - Seite öffnen
// - alle CSS-Dateien finden
// - Dateien herunterladen in einen tmp-Folder
// - cssstats über alle Dateien (oder eine zusammenkopierte Datei!) laufen lassen
// - Ergebnis zusammenmergen (oder sich das sparen!)
// - Ergebnis zurückgeben
// - tmp-Folder löschen
// Der Check selber hat dann wieder Filter für das große cssstats Ergebnis,
// und specihert das Original in einer Datei im reports Folder weg.
