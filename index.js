const async = require('async')

const URLS = {
  'spiegel-de': {
    'homepage': 'http://www.spiegel.de/',
    'article': 'http://www.spiegel.de/politik/deutschland/steinmeier-empfaengt-schulz-merkels-hoffnungstraeger-a-1179786.html',
    'ressort': 'http://www.spiegel.de/politik/'
  },
  'welt-de': {
    'homepage': 'https://www.welt.de/',
    'article': 'https://www.welt.de/politik/deutschland/article170905545/Doppelspitze-der-Alphatiere.html',
    'ressort': 'https://www.welt.de/politik/'
  },
  'zeit-de': {
    'homepage': 'https://www.zeit.de/index',
    'article': 'https://www.zeit.de/politik/ausland/2018-04/james-comey-donald-trump-fbi-ermittlungen-russlandaffaere',
    'ressort': 'https://www.zeit.de/politik/index'
  }
}

// ********************************************************************
// Pa11y Scores
// ********************************************************************
const pa11yCheck = require('./src/checks/pa11y/check')

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
    queue.push({site, type, url: URLS[site][type]}, doneCallback)
  }
}


// ********************************************************************
// HTML Validator
// ********************************************************************
const htmlValidator = require('./src/checks/html-validator/check')

for (let site in URLS) {
  for (let type in URLS[site]) {
    const url = URLS[site][type]
    htmlValidator.run(site, type, url).then(() => {
      console.log(`Finished html-validator for ${url}`)
    })
  }
}

// ********************************************************************
// CSS Stats
// ********************************************************************
const cssstats = require('./src/checks/cssstats/check')

const site = 'zeit-de'
for (let type in URLS[site]) {
  const url = URLS[site][type]
  cssstats.run(site, type, url).then(() => {
    console.log(`Finished cssstats for ${url}`)
  })
}


/*
// ********************************************************************
// Webcoach Scores
// ********************************************************************
const webcoachCheck = require('./src/checks/webcoach/check')

for (let site in URLS) {
  for (let type in URLS[site]) {
    const url = URLS[site][type]
    webcoachCheck.run(site, type, url, false).then(() => {
      console.log(`Finished webcoach for ${url} on Desktop`)
    })
    webcoachCheck.run(site, type, url, true).then(() => {
      console.log(`Finished webcoach for ${url} on Mobile`)
    })
  }
}
*/

/* Fragen:
   - Müssen alle Checks eine Promise zurückgeben? Wie gehen wir damit um?
   - Was ist mit dem mobile Parameter zB? Manche Tools haben sowas, manche nicht. Und wir müssten das im Namespace für Grafite berücksichtigen. Wer macht das? Der Filter ?!
*/
