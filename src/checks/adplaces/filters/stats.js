/**
 * Get the error and info statistics for a given html-validator result
 *
 * @param {object} The html-validator results
 * @returns {object} Object containing errorCount and infoCount
 */
module.exports = dom => {

  const sel = selector => dom.window.document.querySelectorAll(selector).length
  const result = {
    numberOfAds: sel('script[id^="ad-"]'),
    numberOfDesktopAds: sel('script[id^="ad-desktop-"]'),
    numberOfMobileAds: sel('script[id^="ad-mobile-"]')
  }

  const adtilesToCheck = [
  'ad-desktop-1', 'ad-desktop-12', 'ad-desktop-13', 'ad-desktop-16', 'ad-desktop-2', 'ad-desktop-3', 'ad-desktop-4', 'ad-desktop-41', 'ad-desktop-42', 'ad-desktop-43', 'ad-desktop-5', 'ad-desktop-51', 'ad-desktop-8', 'ad-desktop-81', 'ad-desktop-9', 'ad-desktop-99',
  'ad-mobile-1', 'ad-mobile-16', 'ad-mobile-2', 'ad-mobile-3', 'ad-mobile-4', 'ad-mobile-41', 'ad-mobile-42', 'ad-mobile-43', 'ad-mobile-8', 'ad-mobile-99'
  ]

  for (const ad of adtilesToCheck) {
    result[ad] = sel(`script[id^="${ad}"]`)
  }

  return result
}
