/* eslint-disable no-undef */
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode;
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const { resolve } = require('path');
const _htmlPath = _mode === 'production' ? './src/client/views/entry.html' : './src/client/views/index.html';
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin')
var ProgressBarPlugin = require('progress-bar-webpack-plugin');



const _baseConfig = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    entry: resolve('./src/client/index'),
    output: {
        filename: _mode === 'production' ? 'scripts/[name].[hash].js' : '[name].js',
        path: resolve(__dirname, './dist/assets'),
        publicPath: '/assets/'
    },
    plugins: [
        // new CheckerPlugin(),
        new ProgressBarPlugin(),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: resolve(_htmlPath),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(less|css)$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                    },
                ],
            },
            // {
            //     test: /\.(png|jpg|gif)$/i,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 limit: 10,
            //                 name: _mode === 'production' ? '/styles/images/[name].[hash]' : '[name].[ext]'
            //             },
            //         },
            //     ],
            // },
        ]
    }
}
module.exports = merge.merge(_baseConfig, _mergeConfig);