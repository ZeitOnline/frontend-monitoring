/**
 * Get the error, notice and warning statistics for a given puppeteer coverage result
 *
 * @param {object} The puppeteer coverage results
 * @returns {object} Object containing ...
*/
module.exports = coverageResults => {

    let totalBytes = 0;
    let usedBytes = 0;
    for (const entry of [...coverageResults]) {
        totalBytes += entry.text.length;
        for (const range of entry.ranges) {
            usedBytes += range.end - range.start - 1;
        }
    }

    return {
        totalBytes,
        usedBytes,
        coverage: (usedBytes / totalBytes * 100).toFixed(2),
    }
}
