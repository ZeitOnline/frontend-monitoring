const async = require('async')
const pa11yCheck = require('./check')
const URLS = require('../../config/urls')

// TODO: dieses queue Ding ist noch unübersichtlich. Wegabstrahieren für alle? Besser benamsen?
// Und müssen wir denn die Tasks asynchron fahren, wenn pa11y selbst schon asynchron ist?
// ... eher interessant ist die Frage, wie wir ganz am Ende wissen dass wir fertig sind.
// TODO: brauen wir queue überhaupt? Wenn jeder pa11y-Test an sich asynchron ist,
// können wir sie doch ruhig parallel starten ... oder ist es doof wenn dutzende
// Tests parallel laufen, und wir queuen sie deshalb? ... dann aber alle!
const queue = async.queue((task, cb) => {
  pa11yCheck.run(task.site, task.type, task.url).then(() => {
    cb(task.url)
  })
}, 3)

queue.drain = () => {
  // console.log('All Pa11y tests finished.')
}

const doneCallback = (url) => {
  console.log(`Finished pa11y for ${url}`)
}

for (let site in URLS) {
  for (let type in URLS[site]) {
    // Wieso url hier mit `:`? => object con/de-structuring.
    // Wir reichen ein Objekt rein, wo bei den ersten beiden Dingern
    // der Key heißt wie der Variablenname.
    queue.push({ site, type, url: URLS[site][type] }, doneCallback)
  }
}
