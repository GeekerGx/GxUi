
//url帮助类
(function (win) {
    var url = {};

    //获取url参数
    url.getParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = win.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return '';
    };

    //重定向页面
    url.replace = function (url) {
        win.location.replace(url);
    };

    Gx.url = url;
})(window);