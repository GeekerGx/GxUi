const joinPath = require("../src/server/pathHelper");
const webpack = require("webpack");

module.exports = ({
    mode = 'production'
}) => ({
    mode,
    entry: {
        "../Gx.All.js": joinPath('src/index.js'),
        "static/GxUi/Gx.All.js": joinPath('docs/src/index.jsx'),
    },
    output: {
        path: joinPath('docs'),
        filename: '[name]',
        library: 'GxUi',
        libraryTarget: "umd",
    },
    resolve: {
        alias: {
            '@gxui': joinPath("src"),
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/env"],
                    /*plugins: [
                        '@babel/plugin-transform-runtime',
                        [
                            'import', {
                                libraryName: 'antd',
                                style: 'css'
                            }
                        ]
                    ]*/
                }
            },
            {
                test: /\.(css|less)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }]
            }
        ]
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
});