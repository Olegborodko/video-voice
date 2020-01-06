const combineRouters = require('koa-combine-routers');

const sr_subtitles = require('./sr_subtitles')

const router = combineRouters(
	sr_subtitles
)

module.exports = router;