const joinPath = require("../src/server/pathHelper.js");

module.exports = {
    entry: {
        "../Gx.All.js": joinPath('src/index.js'),
        "static/GxUi/Gx.All.js": joinPath('docs/index.js'),
    },
    output: {
        path: joinPath('docs'),
        filename: '[name]',
        libraryExport: "default",
        library: 'GxUi',
        libraryTarget: "umd",
    },
    resolve: {
        alias: {
            '@src': joinPath("src"),
        }
    },
    mode: 'production',
};