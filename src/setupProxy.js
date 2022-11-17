const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    createProxyMiddleware('/stlouisfed', {
      target: 'https://api.stlouisfed.org',
      pathRewrite: {
        '^/stlouisfed':''
      },
      changeOrigin: true
    })
  )
}