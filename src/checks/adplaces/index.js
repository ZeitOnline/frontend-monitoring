const adplacesCheck = require('./check')

const SITES = {
    'homepage': 'https://www.zeit.de/index',
    'politik': 'https://www.zeit.de/politik/index',
    'gesellschaft': 'https://www.zeit.de/gesellschaft/index',
    'wirtschaft': 'https://www.zeit.de/wirtschaft/index',
    'kultur': 'https://www.zeit.de/kultur/index',
    'wissen': 'https://www.zeit.de/wissen/index',
    'digital': 'https://www.zeit.de/digital/index',
    'campus': 'https://www.zeit.de/campus/index',
    'arbeit': 'https://www.zeit.de/arbeit/index',
    'entdecken': 'https://www.zeit.de/entdecken/index',
    'sport': 'https://www.zeit.de/sport/index',
    'zeit-magazin': 'https://www.zeit.de/zeit-magazin/index',
    'zett': 'https://www.zeit.de/zett/index',
    'serie': 'https://www.zeit.de/serie/kiyaks-deutschstunde',
    'autor': 'https://www.zeit.de/autoren/F/Oliver_Fritsch/index.xml',
    'thema': 'https://www.zeit.de/thema/coronavirus'
}

for (const [label, url] of Object.entries(SITES)) {
    adplacesCheck.run(label, url).then(() => {
        console.log(`Finished adplaces for ${url}`)
    })
}
