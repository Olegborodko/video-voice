const Router = require('koa-router');
const router = new Router();
const { spawn, exec } = require('child_process');

router.post('/api/get-subtitles', async (ctx, next) => {
	try {
		// const data = ctx.request.body.data;
		// const id = data['id'];
		// if (data.hasOwnProperty('created_at')){
		// 	delete data['created_at'];
		// }

		// await knex('monitors')
		// 	.where('id', id)
		// 	.update(data)
		//const res = spawn('youtube-dl', ['--write-auto-sub', '--skip-download', `--sub-format 'ttml'`, `--sub-lang 'ru'`, 'https://www.youtube.com/watch?v=8irSFvoyLHQ'])

		const res = exec(`youtube-dl --write-auto-sub --skip-download --sub-format 'ttml' --sub-lang 'ru' https://www.youtube.com/watch?v=8irSFvoyLHQ`, {cwd: __dirname + '/subtitles/'}, (error, stdout, stderr) => {
			if (error) {
				console.log(error.stack);
			}
			console.log('Child Process STDOUT: '+stdout);
  		console.log('Child Process STDERR: '+stderr);
		})

		res.on('exit', function (code) {
  		console.log('Child process exited with exit code '+code);
		});
		
		
		ctx.response.status = 200;
		ctx.body = true;
	} catch(err){
		// if (err.code === 'ER_DUP_ENTRY'){
		// 	ctx.response.status = 200;
		// 	ctx.body = false;
		// 	return;
		// }
		// console.log(err);
		// ctx.response.status = 400;
	}
});

module.exports = router;