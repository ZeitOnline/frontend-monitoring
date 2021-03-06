/**
 * Get the error and info statistics for a given html-validator result
 *
 * @param {object} The html-validator results
 * @returns {object} Object containing errorCount and infoCount
 */
module.exports = dom => {

  const sel = selector => dom.window.document.querySelectorAll(selector).length

  return {
    numberOfTeasers: sel('article[class*="teaser-"]'),
    numberOfZplusTeasers: sel('article[data-zplus]'),
    numberOfPodcastTeasers: sel('article[class*="teaser-podcast"]'),
    numberOfVideoTeasers: sel('button[class*="media-addition--video"]'),
    numberOfTeasersWithCommentcount: sel('span[class*="__commentcount"]'),
    numberOfParquets: sel('section[class*="cp-area--headed"]'),
    numberOfDesktopAds: sel('script[id^="ad-desktop-"]'),
    numberOfMobileAds: sel('script[id^="ad-mobile-"]'),
    specials: {
        wiegehtesihnen: sel('script[src^="https://interactive.zeit.de/wiegehtesihnen/"]'),
        quiz: sel('iframe[src^="https://quiz.zeit.de/"]'),
        panorama: sel('article.zon-teaser-panorama'),
        'zg-aufmacher': sel('.cp-region:first-child article[class*="zg-"]'),
        'zg-teaser': sel('.cp-region:not(:first-child) article[class*="zg-"]'),
        optimize: sel('script[src$="ga_optimize.js"'),
        kickerticker: sel('.zg-kickerticker')
    }
  }
}

// TODO: sind die Schlagzeilen veraltet?
