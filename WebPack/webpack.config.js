const path = require('path');
const joinPath = (url) => {
    return path.join(__dirname, url);
};
module.exports = {
    optimization: {
        minimizer: [
        ]
    },
    entry: joinPath('../src/index.js'),
    output: {
        path: joinPath('../docs'),
        filename: 'Gx.All.js',
    },
    devServer: {
        host: "localhost",
        port: 3000,
        /*disableHostCheck: true,
        publicPath: '/docs/Lib/GxUi/',
        historyApiFallback: true,
        hotOnly: true,
        quiet: false,
        noInfo: false,
        stats: "errors-only",
        overlay: {
            //当有编译错误或者警告的时候显示一个全屏overlay
            errors: true,
            warnings: true
        },*/
        contentBase: joinPath("../docs/Lib/GxUi/"),  //以public为根目录提供文件
        colors: true,
        historyApiFallback: true,
        inline: true,
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, ".."),
            '@components': path.join(__dirname, "..", 'src/components'),
            '@helper': path.join(__dirname, "..", 'src/helper'),
        }
    },
};