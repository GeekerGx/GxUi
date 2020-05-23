
//url帮助类
(function () {
    Gx.url = {
        searchParam: {},
        hashParam: {},
        /**
         * 重定向页面
         * @param  {string} url  url参数
         */
        replace: function (url) {
            window.location.replace(url);
        },
        /**
         * 获取url参数
         * @param {string} name 参数名称
         */
        getParam: function (name) {
            return this.hashParam[name] || this.searchParam[name] || "";
        },
        addParam: function (uri, key, value) {
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
        },
        addParamForObj: function (uri, obj) {
            var that = this;
            if (!obj) {
                return uri;
            }
            for (key in obj) {
                uri = that.addParam(uri, key, obj[key]);
            }
            return uri;
        },
    };

    //#region 加载时直接初始化内容
    (function (that) {
        that.searchParam._root = window.location.search.substr(1);
        that.searchParam._root.split("&").map(function (item) {
            if (!item || item.indexOf("=") == -1) {
                return;
            }
            var r = item.split("=");
            that.searchParam[r[0]] = unescape(r[1]);
        });
        that.hashParam._root = window.location.hash.split("?")[1] || "";
        that.hashParam._root.split("&").map(function (item) {
            if (!item || item.indexOf("=") == -1) {
                return;
            }
            var r = item.split("=");
            that.hashParam[r[0]] = unescape(r[1]);
        });
    })(Gx.url);
    //#endregion
})();