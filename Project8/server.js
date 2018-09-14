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
const login = require('./data/login.json');
const { graphqlExpress } = require('graphql-server-express');
const { graphiqlExpress } = require('graphql-server-express');
const bodyParser = require('body-parser');
const { schema } = require('./schema');

const port = 7000;

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, ''));

//middlewares
app.use('/src', express.static('src'));
console.log(schema);
//Graphql
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

//Demo Login API route (Currently not used in App)
app.get('/login', (req, res) => res.json(login));

//default route
app.get('/', (req, res) => res.render('index'));

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

const listener = app.listen(port, () =>
  console.log(`Waiting for webpack to build...App will run on ${listener.address().address}${listener.address().port}`));
