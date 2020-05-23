const path = require('path');
const joinPath = (url) => {
    return path.join(__dirname, url);
};
module.exports = {
    entry:{
        "Gx.All":joinPath('../src/index.js'),
        "docs/static/GxUi/Gx.All":joinPath('../src/index.js'),
    } ,
    output: {
        path: joinPath('..'),
        filename: '[name].js',
        libraryExport: "default",
        library: 'GxUi',
        libraryTarget: "umd",
    },
    devServer: {
        host: "localhost",
        port: 3000,
    },
    resolve: {
        alias: {
            '@': joinPath(".."),
            '@components': joinPath("../src/components"),
            '@helper': joinPath("../src/helper"),
        }
    },
    mode: 'production',
};