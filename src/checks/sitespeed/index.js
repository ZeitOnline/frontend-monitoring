
const sitespeedCheck = require('./check')
const URLS = require('../../config/sitespeed_urls')

sitespeedCheck.run([URLS[0]])
