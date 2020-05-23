const joinPath = require("../src/server/pathHelper.js");

module.exports = {
    entry: {
        "Gx.All.js": joinPath('src/index.js'),
        "docs/static/GxUi/Gx.All.js": joinPath('src/index.js'),
    },
    output: {
        path: joinPath(''),
        filename: '[name]',
        libraryExport: "default",
        library: 'GxUi',
        libraryTarget: "umd",
    },
    resolve: {
        alias: {
            '@': joinPath(""),
            '@components': joinPath("src/components"),
            '@helper': joinPath("src/helper"),
        }
    },
    mode: 'production',
};