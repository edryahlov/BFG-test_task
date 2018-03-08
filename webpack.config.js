const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        'jquery/dist/jquery.min.js',
        './src/index.js'
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015', 'stage-0']
                    },
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        //includePaths: ["absolute/path/a", "absolute/path/b"]
                        //includePaths: [path.resolve(__dirname, './node_modules/foundation-sites/scss')]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            conf: path.resolve(__dirname, 'src/conf.js')
        }
    },
    devtool: 'inline-source-map',
};
