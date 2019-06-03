
//url帮助类
(function (win) {
    var url = {};

    url.searchParam = {};
    url.hashParam = {};
    url.init = function () {
        var that = this;
        this.searchParam._root = win.location.search.substr(1);
        this.searchParam._root.split("&").map(function (item) {
            if (!item || item.indexOf("=") == -1) {
                return;
            }
            var r = item.split("=");
            that.searchParam[r[0]] = unescape(r[1]);
        });
        this.hashParam._root = win.location.hash.split("?")[1];
        this.hashParam._root.split("&").map(function (item) {
            if (!item || item.indexOf("=") == -1) {
                return;
            }
            var r = item.split("=");
            that.hashParam[r[0]] = unescape(r[1]);
        });
    };
    //获取url参数
    url.getParam = function (name) {
        return this.hashParam[name] || this.searchParam[name] || "";
    };

    //重定向页面
    url.replace = function (url) {
        win.location.replace(url);
    };

    Gx.url = url;
    url.init();
})(window);