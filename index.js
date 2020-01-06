const Koa = require('koa')
const path = require('path')
const staticFIles = require('koa-static')
const fs = require('fs')
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

const server = require('./src/server');

const router = new Router();
const app = new Koa()

if (process.env.NODE_ENV === 'development') {
	app.use(cors({
		origin: '*',
	})); 
}

app.use(staticFIles(path.resolve('build')))
app.use(staticFIles(path.resolve('public')))

app.use(bodyParser());
app.use(server());

router.get(
	'*',
  async (ctx, next) => {
	  ctx.type = 'html';
	  ctx.body = createReadStream('./build/index.html');
});

app.use(router.routes());
app.use(router.allowedMethods());

if (process.env.NODE_ENV === 'test') {
	module.exports = app.listen(process.env.PORT)
} else {
	app.listen(process.env.PORT || 3001)
}