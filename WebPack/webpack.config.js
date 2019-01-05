const path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        Script: path.join(__dirname, 'Gx.Script.js'),
        Style: path.join(__dirname, 'Gx.Style.js')
    },
    output: {
        path: path.join(__dirname, '..'),
        filename: 'Gx.All.[name].js',
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ]
            }
        ]
    },
    plugins: [
        // 复制插件
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '../Lib'),
                to: path.join(__dirname, '../docs/Lib')
            },
            {
                from: path.join(__dirname, '../Gx.All.Script.js'),
                to: path.join(__dirname, '../docs/')
            },
            {
                from: path.join(__dirname, '../Gx.All.Style.js'),
                to: path.join(__dirname, '../docs/')
            }
        ])
    ]
};