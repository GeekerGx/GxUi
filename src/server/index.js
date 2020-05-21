const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const express = require("express");
const app = express();
app.use(express.static(__dirname + "./../../docs"));
webpackConfig = require("../../WebPack/webpack.config.js");

webpackDevServer.addDevServerEntrypoints(webpackConfig, webpackConfig.devServer);
const comiler = webpack(webpackConfig);
console.log(`Webpack running on localhost:3000`);
let bundleStart = null;
comiler.plugin("compile", () => {
    console.log("Bundling...");
    bundleStart = Date.now();
});
comiler.plugin("done", () => {
    console.log(`Bundled in ${Date.now() - bundleStart} ms!`);
});
const bundler = new webpackDevServer(comiler, webpackConfig.devServer);
bundler.listen(3000, "localhost", () => {
    console.log("Bundling project, please wait...");
});

app.listen(3000, () => {
    console.log(`Server running on port ${3000}`);
});
