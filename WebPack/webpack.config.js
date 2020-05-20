const path = require('path');

module.exports = {
    optimization: {
        minimizer: [
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
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            '@': path.join(__dirname, ".."),
            '@components': path.join(__dirname, "..", 'src/components'),
            '@helper': path.join(__dirname, "..", 'src/helper'),
        }
    },
    module: {
        rules: [{
            test: /\.jsx$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }
        ]
    },
    plugins: [
    ]
};