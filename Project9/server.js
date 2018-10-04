const [appName] = process.argv.slice(2);

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

let config = require('./webpack.config');
const path = require('path');
const express = require('express');
const app = new (require('express'))();
const port = 3000;

switch ((appName || '').toLowerCase()) {
  case 'login': config = config[0]; console.log('using login config'); break;
  case 'app': config = config[1]; console.log('using app config'); break;
  default: config = config[1]; console.log('using default config'); break;
}

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath, stats: 'errors-only' }));
app.use(webpackHotMiddleware(compiler));

app.get("/static/config.js", function(req, res) {
  res.sendFile(__dirname + '/src/config.js');
});

app.use('*', function (req, res, next) {
  var filename = path.join(compiler.outputPath,'index.html');
  compiler.outputFileSystem.readFile(filename, function(err, result){
    if (err) {
      console.error(err);
      return next('Webpack is probably still bundling your file. Check your console and refresh in a few seconds.');
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
});
