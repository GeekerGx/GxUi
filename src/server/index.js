const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const webpackConfig = require("../../WebPack/webpack.config.js");
const joinPath = require("./pathHelper.js");

const option = {
    host: "localhost",
    port: 3000,
    contentBase: joinPath('docs'),
    overlay: true,
    stats: "errors-only",
    quiet: false,
    compress: false,
};
webpackDevServer.addDevServerEntrypoints(webpackConfig, option);

const compiler = webpack(webpackConfig);
let bundleStart = null;
compiler.plugin("compile", () => {
    console.log("Bundling...");
    bundleStart = Date.now();
});
compiler.plugin("done", () => {
    console.log(`Bundled in ${Date.now() - bundleStart} ms!`);
});

const bundler = new webpackDevServer(compiler, option);
bundler.listen(option.port, option.host, () => {
    console.log("Bundling project, please wait...");
});