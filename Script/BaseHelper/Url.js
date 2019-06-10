
//url帮助类
(function (win) {
    var url = {};

    url.searchParam = {};
    url.hashParam = {};
    url._init = function () {
        var that = this;
        this.searchParam._root = win.location.search.substr(1);
        this.searchParam._root.split("&").map(function (item) {
            if (!item || item.indexOf("=") == -1) {
                return;
            }
            var r = item.split("=");
            that.searchParam[r[0]] = unescape(r[1]);
        });
        this.hashParam._root = win.location.hash.split("?")[1] || "";
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

    /**
     * 重定向页面
     * @param  {string} url  url参数
     */
    url.replace = function (url) {
        win.location.replace(url);
    };
    url.addParamForObj = function (uri, obj) {
        var that = this;
        if (!obj) {
            return uri;
        }
        for (key in obj) {
            uri = that.addParam(uri, key, obj[key]);
        }
        return uri;
    };
    url.addParam = function (uri, key, value) {
        if (!value) {
            return uri;
        }
        var re = new RegExp("([?&])" + key + "=[^#]*?([?&#]|$)", "gm");
        var separator = uri.lastIndexOf('?') > uri.lastIndexOf('#') ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
            return uri + separator + key + "=" + value;
        }
    }

    Gx.url = url;
})(window);