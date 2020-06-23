const joinPath = require("../src/server/PathHelper");
const webpack = require("webpack");

module.exports = ({
    mode = 'production',
    devtool
}) => ({
    mode,
    devtool,
    entry: {
        "../Gx.All.js": joinPath('src/index.js'),
        "static/GxUi/Gx.All.js": joinPath('docs/src/index.js'),
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
            '@docs': joinPath("docs"),
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                use: "raw-loader"
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/env"],
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
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }]
            }
        ]
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
});