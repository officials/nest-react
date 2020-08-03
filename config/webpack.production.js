/* eslint-disable @typescript-eslint/no-var-requires */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    optimization: {
        splitChunks: {
            chunks: "async", // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)
            minSize: 30000, // 最小尺寸，30000
            maxSize: 100000,
            minChunks: 1, // 最小 chunk ，默认1
            maxAsyncRequests: 6, // 最大异步请求数， 默认5
            maxInitialRequests: 3, // 最大初始化请求书，默认3
            automaticNameDelimiter: '~',// 打包分隔符
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial"
                }
            }
        }
    },
    externals: {
    },
    plugins: [
        new CleanWebpackPlugin(),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
        new MiniCssExtractPlugin({
            filename: "styles/[name].[hash:5].css",
            chunkFilename: "styles/[name].[hash:5].css",
            ignoreOrder: false,
        }),

        // new BundleAnalyzerPlugin({
        //     analyzerPort: 3011,
        //     reportFilename: resolve(__dirname, '../stats.json')
        // })
    ],
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    'less-loader'
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './images/[contenthash].[ext]'
                        }
                    },
                ],
            },
        ],
    },
};