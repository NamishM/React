const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const version = `?v=${Date.now()}`;

const genBaseConfig = ({
  entryPoint,
  dist,
  basePath,
  publicPath,
  disableGoogleAnalytics,
}) => {
  const wpConfig = {
    entry: {
      vendor: [
        'babel-polyfill',
        'font-awesome-webpack!./src/theme/font-awesome.config.prod.js',
        'lodash',
        'redux',
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
      strictThisContextOnImports: false,
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader', 'source-map-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.(ts|tsx)$/,
          use: ['babel-loader', 'awesome-typescript-loader'],
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
          loader: 'file-loader',
          options: {
            name: '[hash].[ext]',
            publicPath: '',
          },
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
      new ExtractTextPlugin({ filename: '[contenthash].[name].css', allChunks: true }),
      new HtmlWebpackPlugin({
        // Required
        inject: false,
        chunks: ['main', 'vendor'],
        template: path.join(__dirname, 'template.ejs'), // require('html-webpack-template'),
        content: null,
        // options
        title: 'SkillGigs | Tech Talent Job Search Marketplace | Hire Top Tech Talent',
        minify: {
          collapseWhitespace: true,
          preserveLineBreaks: true,
        },
        appMountIds: ['main', 'outdated'],
        baseHref: basePath,
        scripts: [`${publicPath}config.js${version}`],
        mobile: true,
        googleAnalytics: !disableGoogleAnalytics ? {
          trackingId: 'UA-42322554-1',
          pageViewOnLoad: true,
        } : null,
      }),
    ],
    performance: {
      hints: false,
    },
    mode: 'production',
  };

  return wpConfig;
};


module.exports = [
  genBaseConfig({
    entryPoint: './src/login.app.tsx',
    dist: 'distLogin',
    basePath: '/Skillgigs/Login',
    publicPath: 'Content/app/static/',
    disableGoogleAnalytics: true,
  }),
  genBaseConfig({
    entryPoint: './src/main.app.tsx',
    dist: 'distApp',
    basePath: '/Skillgigs/',
    publicPath: 'static/',
    disableGoogleAnalytics: false,
  }),
];
