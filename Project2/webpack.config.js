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
            // Only run `.js` and `.jsx` files through Babel
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
            }
        ]
    },
    resolve: {
      modules: [
        'src',
        'node_modules',
      ],
      extensions: ['.json', '.js', '.jsx']
    }
};