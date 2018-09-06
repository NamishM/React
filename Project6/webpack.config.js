const path = require('path');
const webpack = require('webpack');
const WebpackBuildNotifier = require('webpack-build-notifier');
const isProduction = process.env.NODE_ENV === 'production';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    devtool : 'source-map',
    entry: {
        main: ['babel-polyfill', './src/main.jsx']        
    },
    output: {
        path: path.join(__dirname, 'src', 'bundle'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /.*/,
                include: [path.resolve(__dirname, 'src/modules/Pages')],
                loader: 'bundle-loader?lazy&name=pages'
            },
            { 
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                    loader: 'css-loader',
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader", options: {
                        paths: [
                            path.resolve(__dirname, "node_modules")
                        ]
                    }
                }]
            },
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                exclude: /node_modules|data|src\/assets|bootstrap\.config\.js|font-awesome\.config\.js/,
            },
            {
                test: /\.(js|jsx)?$/,
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
                test: /\.(jpe?g|png|gif|svg|mp4|ogg|svg|eot|ttf|woff|woff2)$/i,
                loaders: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
      },  
      modules: [
        'src',
        'node_modules',
      ],
      extensions: ['.json', '.js', '.jsx', '.css']
    },
    plugins: [
        new WebpackBuildNotifier(),
        new webpack.HotModuleReplacementPlugin()
    ]
};