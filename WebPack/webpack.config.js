const path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    optimization: {
    },
    entry: {
        "Gx.All": path.join(__dirname, 'Gx.All.js'),
        //文档使用
        "docs/Gx.All": path.join(__dirname, 'Gx.All.js'),
    },
    output: {
        path: path.join(__dirname, '..'),
        filename: '[name].js',
    },
    module: {
        rules: [{
            test: /\.jsx$/,
            use: 'babel-loader'
        },
        {
            test: /\.less$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../'
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
            // 复制插件
            {
                from: path.join(__dirname, '../Lib'),
                to: path.join(__dirname, '../docs/Lib')
            },
            // 复制插件
            {
                from: path.join(__dirname, '../Script/BaseHelper/Config.js'),
                to: path.join(__dirname, '../docs/Gx.Config.js')
            },
            // 复制插件
            {
                from: path.join(__dirname, '../Script/BaseHelper/Config.js'),
                to: path.join(__dirname, '../Gx.Config.js')
            }]),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
    ]
};