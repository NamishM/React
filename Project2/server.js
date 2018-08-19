const path = require('path');
const consolidate = require('consolidate');
const express = require('express');
const mock = require('./data/mock.json');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
let config = require('./webpack.config');

const port = 7000;

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'templates'));

//middlewares
app.use('/src', express.static('src'));

//default route
app.get('/', (req, res) => res.render('index', { title : 'Namish Mudgal | Portfolio' }));

//your routes
app.get('/items', (req, res) => res.json(mock));

const listener = app.listen(port, () =>
  console.log(`Waiting for webpack to build...App will run on ${listener.address().address}${listener.address().port}`));
