const webpack = require('webpack');
const path = require('path');
// const Visualizer = require('webpack-visualizer-plugin'); // Add visualizer for debugging
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const version = '?v=1';
// const srcDir = path.join(__dirname, 'src');

const genBaseConfig = ({
  entryPoint,
  dist,
  basePath,
  publicPath,
  withModelJSON,
  disableRx,
  disableGoogleAnalytics,
  genSilentRenew = false,
}) => {
  const wpConfig = {
    entry: {
      vendor: [
        'babel-polyfill',
        // compile bootstrap with overrides
        'bootstrap-sass!./src/theme/bootstrap.config.prod.js',
        // compile font-awesome with overrides
        'font-awesome-webpack!./src/theme/font-awesome.config.prod.js',
        'jquery',
        'moment',
        'lodash',
        'redux',
        'react-bootstrap-multiselect',
        'react-infinite',
      ],
      main: entryPoint,
    },
    output: {
      path: path.join(__dirname, dist),
      filename: '[hash].[id].bundle.js',
      publicPath,
    },
    externals: {
      './src/config': 'config',
    },
    cache: true,
    module: {
      strictThisContextOnImports: true, // TODO: Turn off when https://github.com/webpack/webpack/issues/5135 fixed
      rules: [
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
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                query: {
                  importLoaders: 2,
                },
              },
              'postcss-loader',
              'less-loader',
            ],
          }),
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                query: {
                  modules: true,
                  importLoaders: 1,
                },
              },
              'postcss-loader',
            ],
          }),
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
      unsafeCache: true,
    },
    resolveLoader: {
      moduleExtensions: ['-loader'],
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: '[hash].commons.js',
      }),
      // https://github.com/webpack/webpack/issues/3018#issuecomment-248633498
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
          // postcss: () => [autoprefixer],
        },
      }),
      new CleanWebpackPlugin([dist]),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false,
        },
        exclude: ['config.bundle.js'],
        sourceMap: false,
        comments: false,
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      // new Visualizer(),
      new BundleAnalyzerPlugin({
        generateStatsFile: true,
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: 'stats.html',
      }),
      new ExtractTextPlugin({ filename: '[contenthash].[name].css', allChunks: true }),
      new HtmlWebpackPlugin({
        // Required
        inject: false,
        chunks: ['main', 'vendor'],
        template: path.join(__dirname, 'template.ejs'), // require('html-webpack-template'),
        content: withModelJSON ?
  `<script id='modelJson' type='application/json'>
    {model}
  </script>` : null,
        // options
        title: 'SRS Mobile',
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
        googleAnalytics: !disableGoogleAnalytics ? {
          trackingId: 'UA-85947827-1',
          pageViewOnLoad: true,
        } : null,
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
        chunks: ['silentRenew', 'vendor'],
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


module.exports = [
  // genBaseConfig({
  //   entryPoint: './src/rx.app.jsx',
  //   dist: 'dist',
  //   basePath: '/SRSUI/Mobile/',
  //   publicPath: '/SRSUI/Mobile/static/',
  //   withModelJSON: false,
  //   disableRx: false,
  //   disableGoogleAnalytics: false,
  // }),
  genBaseConfig({
    entryPoint: './src/login.app.jsx',
    dist: 'distLogin',
    basePath: '/SRSIdentityServer/',
    publicPath: '/SRSIdentityServer/Content/app/static/',
    withModelJSON: true,
    disableRx: true,
    disableGoogleAnalytics: true,
  }),
  genBaseConfig({
    entryPoint: './src/main.app.jsx',
    dist: 'distNoRx',
    basePath: '/SRSUI/Mobile/',
    publicPath: '/SRSUI/Mobile/static/',
    withModelJSON: false,
    disableRx: true,
    disableGoogleAnalytics: false,
    genSilentRenew: true,
  }),
];
