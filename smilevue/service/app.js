const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const { connect } = require('./utils/connect');
const goods = require('./routes/goods');

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(cors({
  origin: function(ctx) {
    return ctx.header.origin
  }, // 允许发来请求的域名
  allowMethods: [ 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS' ], // 设置所允许的 HTTP请求方法
  credentials: true, // 标示该响应是合法的
}));

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// // routes
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
router.use('/api/goods', goods.routes()); // 商品相关
app.use(router.routes())
   .use(router.allowedMethods());
  (async () => {
  await connect(); // 执行连接数据库任务
})();
module.exports = app
