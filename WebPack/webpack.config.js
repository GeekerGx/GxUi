const path = require('path');

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
    }
};