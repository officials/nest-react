/* eslint-disable @typescript-eslint/no-var-requires */
const { join, resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    target: 'node',
    entry: {
        app: join(__dirname, "./src/client/layouts/AppServer.tsx")
    },
    output: {
        filename: "entry/index.js",
        path: join(__dirname, "dist"),
        libraryTarget: "commonjs2"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "entry/index.css",
            chunkFilename: "entry/index.css",
            ignoreOrder: false,
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                include: [resolve('src')],
                exclude: /node-modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(css|less)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'production',
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'less-loader',
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './assets/images/[contenthash].[ext]'
                        }
                    },
                ],
            }
        ]
    },
    externals: Object.keys(require('./package.json').dependencies),
    resolve: {
        modules: ["node_modules", resolve("src")],
        extensions: [".js", ".ts", ".tsx", "jsx"]
    },
}