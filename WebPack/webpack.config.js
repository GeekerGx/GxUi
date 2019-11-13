const path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var UglifyESPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    optimization: {
        minimizer: [
            new UglifyESPlugin({
                uglifyOptions: {
                    mangle: false,
                }
            })
        ]
    },
    entry: {
        //生成js css文件
        "Lib/GxUi/Gx.All": path.join(__dirname, 'Gx.All.js'),
        //文档使用
        "docs/Lib/GxUi/Gx.All": path.join(__dirname, 'Gx.All.js'),
    },
    output: {
        path: path.join(__dirname, '..'),
        filename: '[name].js',
    },
    module: {
        rules: [{
            test: /\.jsx$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        },
        {
            test: /\.less$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../Lib/GxUi'
                }
            },
                "css-loader",
                "less-loader"
            ]
        }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            //#region 复制Gx配置文件
            {
                from: path.join(__dirname, '../Script/BaseHelper/Config.js'),
                to: path.join(__dirname, '../Lib/GxUi/Gx.Config.js')
            },
            {
                from: path.join(__dirname, '../Script/BaseHelper/Config.js'),
                to: path.join(__dirname, '../docs/Lib/GxUi/Gx.Config.js')
            },
            //#endregion
            // 复制Lib插件
            {
                ignore: ["GxUi/Gx.*"],
                from: path.join(__dirname, '../Lib'),
                to: path.join(__dirname, '../docs/Lib')
            },]),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        // 用于优化css文件
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessorOptions: {
                safe: true,
                autoprefixer: { disable: true },
                mergeLonghand: false,
                discardComments: {
                    removeAll: true // 移除注释
                }
            },
            canPrint: true
        }),
    ]
};