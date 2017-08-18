var path = require('path');
module.exports = {
    entry: {
         main: [
        './src/entry.jsx',
      ],        
    },
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    devServer: {
        inline: true,
        contentBase: './src',
        port: 8100
    },
    module: {
        rules: [
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
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                loader: 'eslint-loader',
            },
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: [
                    {
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true,
                        presets:['react'],
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
    }
};