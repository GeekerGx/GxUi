const path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        "Gx.All.Script.js": path.join(__dirname, 'Gx.Script.js'),
        "Gx.All.Style.js": path.join(__dirname, 'Gx.Style.js'),
        "docs/Gx.All.Script.js": path.join(__dirname, 'Gx.Script.js'),
        "docs/Gx.All.Style.js": path.join(__dirname, 'Gx.Style.js')
    },
    output: {
        path: path.join(__dirname, '..'),
        filename: '[name]',
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
            }
        ])
    ]
};