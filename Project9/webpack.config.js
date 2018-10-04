const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBuildNotifier = require('webpack-build-notifier');
const {CheckerPlugin} = require('awesome-typescript-loader');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const version = `?v=${ Date.now()}`;

const genBaseConfig = ({
  entryPoint,
  dist,
  basePath,
  publicPath,
}) => {
  const wpConfig = {
    performance: {
      hints: false,
    },
    devtool: 'inline-source-map',
    entry: {
      main: [
        'react-hot-loader/patch',
        'babel-polyfill',
        'webpack-hot-middleware/client',
        'font-awesome-webpack!./src/theme/font-awesome.config.js',
        entryPoint,
      ],
    },
    output: {
      path: path.join(__dirname, dist),
      filename: '[hash].[id].bundle.js',
      publicPath,
    },
    externals: {
      './src/config': 'config',
    },
    module: {
      strictThisContextOnImports: false,
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.(ts|tsx)$/,
          use: ['babel-loader', 'awesome-typescript-loader'],
        },
        {
          test: /\.json$/,
          loader: 'json',
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
              },
            },
            'postcss-loader',
            'less-loader',
          ],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[path][name]---[local]---[hash:base64:5]',
              },
            },
            'postcss-loader',
          ],
        },
        { test: /\.png$/, loader: 'url-loader?limit=100000' },
        {
          test: /\.(jpg|eot|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader?name=[hash].[ext]',
        },
      ],
    },
    resolve: {
      modules: [
        'src',
        'node_modules',
      ],
      extensions: ['.js', '.json', '.ts', '.tsx'],
      alias: {
        sg: path.resolve(__dirname, 'src'),
      },
    },
    resolveLoader: {
      // loaders now require -loader. Enabling this extension allows us to keep our config the same.
      moduleExtensions: ['-loader'],
    },
    plugins: [
      new CheckerPlugin(),
      new StyleLintPlugin(),  
      new webpack.LoaderOptionsPlugin({
        minimize: false,
        debug: true,
        options: {
          // postcss: () => [autoprefixer],
        },
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/),
      new HtmlWebpackPlugin({
        // Required
        inject: false,
        chunks: ['main'],
        template: path.join(__dirname, 'template.ejs'), // require('html-webpack-template'),
        content: null,
        // options
        title: 'Dev:SkillGigs',
        minify: {
          collapseWhitespace: true,
          preserveLineBreaks: true,
        },
        appMountIds: ['main', 'outdated'],
        baseHref: basePath,
        scripts: [`${publicPath}config.js${version}`],
        mobile: true,
      }),
      new WebpackBuildNotifier(),
    ],
    mode: 'development',
  };
  return wpConfig;
};

module.exports = [
  genBaseConfig({
    entryPoint: './src/login.app.tsx',
    dist: 'distLogin',
    basePath: '/',
    publicPath: '/static/',
  }),
  genBaseConfig({
    entryPoint: './src/main.app.tsx',
    dist: 'distApp',
    basePath: '/',
    publicPath: '/static/',
  }),
];
