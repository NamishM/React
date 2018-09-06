const path = require('path');
const consolidate = require('consolidate');
const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
let config = require('./webpack.config');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const port = 7000;

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, ''));

//middlewares
app.use('/src', express.static('src'));

//graphql
const schema = buildSchema(`type Query {hello: String}`);

const root = { hello: () => 'Hello world!' };

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

//default route
app.get('/', (req, res) => res.render('index', { title : 'Namish Mudgal | Portfolio' }));

const listener = app.listen(port, () =>
  console.log(`Waiting for webpack to build...App will run on ${listener.address().address}${listener.address().port}`));
