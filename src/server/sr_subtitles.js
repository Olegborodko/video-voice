const Router = require('koa-router');
const router = new Router();
const youtubedl = require('youtube-dl')
const url = 'https://youtu.be/PizwcirYuGY'

const options = {
  // Write automatic subtitle file (youtube only)
  auto: true,
  // Downloads all the available subtitles.
  all: false,
  // Subtitle format. YouTube generated subtitles
  // are available ttml or vtt.
  format: 'ttml',
  // Languages of subtitles to download, separated by commas.
  lang: 'ru',
  // The directory to save the downloaded files in.
  cwd: __dirname + '/subtitles/',
  //outtmpl: __dirname + '/subtitles/' + 'test.ttml'
}

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

		youtubedl.getSubs(url, options, function(err, files) {
		  if (err) throw err

		  console.log('subtitle files downloaded:', files)
		})
		
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