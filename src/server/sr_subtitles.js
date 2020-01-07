require('dotenv').config()
const Router = require('koa-router');
const router = new Router();
const { spawn, exec } = require('child_process');
const fs = require('fs')

router.post('/api/get-subtitles', async (ctx, next) => {
	try {
		const videoId = ctx.request.body.videoId;
		const videoLink = ctx.request.body.videoLink;
		const path = `${__dirname}/subtitles/${videoId}.ru.ttml`

		function readFile(path){
			return fs.readFileSync(path).toString()
		}

		if (fs.existsSync(path)) {
			ctx.response.status = 200;
			ctx.body = readFile(path);
			return;
		}

		const execRun = await new Promise((resolve) => {
			exec(`youtube-dl -o ${videoId} --write-auto-sub --skip-download --sub-format 'ttml' --sub-lang 'ru' ${videoLink}`, {cwd: __dirname + '/subtitles/'}, (error, stdout, stderr) => {
				if (error) {
					console.log(error.stack);
					resolve(false);
				}
				resolve(true);
			})
		})
		
		if (execRun){
			ctx.response.status = 200;
			ctx.body = readFile(path);
		} else {
			ctx.response.status = 400;
		}
		
	} catch(err){
		ctx.response.status = 400;
	}
});

module.exports = router;