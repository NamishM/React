const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const version = '?v=1';

const genBaseConfig = ({
  entryPoint,
  dist,
  basePath,
  publicPath,
  withModelJSON,
  disableRx,
  genSilentRenew = false,
}) => {
  const wpConfig = {
    performance: {
      hints: false,
    },
    // source-map external file (output.sourceMapFilename) //cheap-module-eval-source-map
    devtool: 'source-map',
    entry: {
      main: [
        // 'react-hot-loader/patch',
        'babel-polyfill',
        // If you're trying to make multiple entry points you're doing it wrong. Use Code Splitting!
        'webpack-hot-middleware/client',
        // compile bootstrap with overrides
        'bootstrap-sass!./src/theme/bootstrap.config.js',
        // compile font-awesome with overrides
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
      strictThisContextOnImports: true, // TODO: Turn off when https://github.com/webpack/webpack/issues/5135 fixed
      rules: [
        {
          test: /\.(js|jsx)$/,
          enforce: 'pre',
          loader: 'eslint-loader',
          exclude: /node_modules|src\/theme|bootstrap\.config\.js|font-awesome\.config\.js/,
        },
        {
          // Only run `.js` and `.jsx` files through Babel
          test: /\.jsx?$/,
          // Skip any files outside of your project's `src` directory
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              query: {
                cacheDirectory: true,
              },
            },
          ],
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
      extensions: ['.json', '.js', '.jsx'],
      alias: {
        srs: path.resolve(__dirname, 'src'),
      },
    },
    resolveLoader: {
      // loaders now require -loader. Enabling this extension allows us to keep our config the same.
      moduleExtensions: ['-loader'],
    },
    plugins: [
      // new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: false,
        debug: true,
        options: {
          // postcss: () => [autoprefixer],
        },
      }),
      // new webpack.optimize.CommonsChunkPlugin('commons.chunk.js'),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/),
      new HtmlWebpackPlugin({
        // Required
        inject: false,
        chunks: ['main'],
        template: path.join(__dirname, 'template.ejs'), // require('html-webpack-template'),
        content: withModelJSON ?
  `<script id='modelJson' type='application/json'>
    {model}
  </script>` : null,
        // options
        title: 'Dev:SRS Mobile',
        minify: {
          collapseWhitespace: true,
          preserveLineBreaks: true,
        },
        appMountIds: ['main', 'outdated'],
        baseHref: basePath,
        //  Below libraries will be moved to Rx page scriptLoaded as soon Rcopia fix issues
        scripts:
        [`${publicPath}config.js${version}`,],
        mobile: true,
        meta: {
          'theme-color': '#ffffff',
        },
        links: [
          {
            rel: 'apple-touch-icon',
            href: `${publicPath}apple-touch-icon.png${version}`,
            sizes: '180x180',
          },
          {
            rel: 'icon',
            type: 'image/png',
            href: `${publicPath}favicon-32x32.png${version}`,
            sizes: '32x32',
          },
          {
            rel: 'icon',
            type: 'image/png',
            href: `${publicPath}favicon-16x16.png${version}`,
            sizes: '16x16',
          },
          {
            rel: 'manifest',
            href: `${publicPath}manifest.json${version}`,
          },
          {
            rel: 'mask-icon',
            href: `${publicPath}safari-pinned-tab.svg${version}`,
            color: '#5bbad5',
          },
          {
            rel: 'shortcut icon',
            href: `${publicPath}favicon.ico${version}`,
          },
        ],
      }),
    ],
  };

  if (genSilentRenew) {
    wpConfig.plugins.push(
      new HtmlWebpackPlugin({
        inject: false,
        template: path.join(__dirname, 'template.ejs'),
        chunks: ['silentRenew'],
        title: 'Dev:Silent Renew',
        minify: {
          collapseWhitespace: true,
          preserveLineBreaks: true,
        },
        appMountIds: ['main'],
        filename: 'silent_renew.html',
      })
    );
    wpConfig.entry.silentRenew = './src/silentRenew.app.jsx';
  }
  return wpConfig;
};

// This must be a single webpack object or an array.
// Otherwise eslint-import-resolver-webpack can't read the file.
// https://www.npmjs.com/package/eslint-import-resolver-webpack
module.exports = [
  // genBaseConfig({
  //   entryPoint: './src/rx.app.jsx',
  //   dist: 'dist',
  //   basePath: '/',
  //   publicPath: '/static/',
  //   withModelJSON: false,
  //   disableRx: false,
  // }),
  genBaseConfig({
    entryPoint: './src/login.app.jsx',
    dist: 'distLogin',
    basePath: '/',
    publicPath: '/static/',
    withModelJSON: true,
    disableRx: true,
  }),
  genBaseConfig({
    entryPoint: './src/main.app.jsx',
    dist: 'distNoRx',
    basePath: '/',
    publicPath: '/static/',
    withModelJSON: false,
    disableRx: true,
    genSilentRenew: true,
  }),
];

