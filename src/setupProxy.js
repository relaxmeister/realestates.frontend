const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware("/items", {
      target: "https://www.allabrf.se",
      changeOrigin: true
    })
  );
};