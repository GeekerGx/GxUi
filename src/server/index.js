const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const webpackConfig = require("../../WebPack/webpack.config.js");

const option = {
    host: webpackConfig.devServer.host,
    port: webpackConfig.devServer.port,
    contentBase: webpackConfig.output.path,
    overlay: true,
    stats: "errors-only",
    quiet: false,
    compress: false,
};
webpackDevServer.addDevServerEntrypoints(webpackConfig, option);

const comiler = webpack(webpackConfig);
let bundleStart = null;
comiler.plugin("compile", () => {
    console.log("Bundling...");
    bundleStart = Date.now();
});
comiler.plugin("done", () => {
    console.log(`Bundled in ${Date.now() - bundleStart} ms!`);
});

const bundler = new webpackDevServer(comiler, option);
bundler.listen(webpackConfig.devServer.port, webpackConfig.devServer.host, () => {
    console.log("Bundling project, please wait...");
});