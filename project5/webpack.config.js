const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    main: ['babel-polyfill', './static/js/apps/main.jsx']
  },
  output: {
    path: path.join(__dirname, 'static', 'js'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['es2015', {modules: false}], 'react', 'stage-3']
            }
          }
        ]
      }
    ]
  },
  resolve : {
    extensions: ['.js', '.json', '.jsx'],
    modules: ['node_modules'/* add additional folders right here */]
  },
  plugins: []
};
