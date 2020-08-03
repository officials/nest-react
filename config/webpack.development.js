/* eslint-disable @typescript-eslint/no-var-requires */
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const { resolve } = require('path');
const webpack = require('webpack');
module.exports = {

    devServer: {
        contentBase: "./dist",
        hot: true,
        compress: true,
        port: 8080,
        historyApiFallback: true  //浏览器路由
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: ['You application is running here http://localhost:8080'],
                notes: ['生产环境已启动']
            },
            onErrors: function () {
                // You can listen to errors transformed and prioritized by the plugin
                // severity can be 'error' or 'warning'
            },
            clearConsole: true,

            // add formatters and transformers (see below)
            additionalFormatters: [],
            additionalTransformers: []
        }),
        new WebpackBuildNotifierPlugin({
            title: "Build Success",
            logo: resolve("./img/favicon.png"),
            suppressSuccess: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    },
                ],
            },
        ]
    }

}