//ajax帮助类
(function (win, $) {

    //默认配置
    var _setting = {
        url: "", //发送请求的地址
        type: "post", //请求方法
        timeout: 1000 * 60, //请求超时时间（毫秒）
        async: true, //是否异步请求
        cache: false, //从浏览器缓存中加载请求信息
        data: {}, //参数
        dataType: "json", //预期服务器返回的数据类型
        beforeSend: function beforeSend() { }, //发送请求前
        complete: function complete() { }, //请求完成后调用的回调函数（请求成功或失败时均调用）
        success: function success(data) { }, //请求成功后调用的回调函数
        //请求失败后调用的回调函数
        error: function error(data) {
            //系统直接报错没有捕捉
            if (data.status == 500) {
                alert("服务报错：" + data.responseText);
                return;
            }
            if (data.status == 404) {
                alert("未找到页面！");
                return;
            }
            //提示捕捉到的错误
            alert(data);
        }
    };

    //封装ajax
    Gx.ajax = function (url, data, success, error, async, config) {
        var ajaxObj = Gx.base.mergeParam(_setting, config);
        ajaxObj.url = url;
        for (var index in data) {
            if (Gx.base.isObject(data[index])) {
                data[index] = JSON.stringify(data[index]);
            }
        }
        ajaxObj.data = data;
        ajaxObj.success = function (data) {
            if (data.state == false) {
                if (Gx.base.isFunction(error)) {
                    error(data);
                } else {
                    alert(data.msg);
                }
                return;
            }
            if (Gx.base.isFunction(success)) {
                success(data);
                return;
            }
        };
        if (Gx.base.isBoolean(async)) {
            ajaxObj.async = async;
        }
        return $.ajax(ajaxObj);
    };
    Gx.ajaxPost = function (url, data, success, error, async, config) {
        config = config || {};
        config.type = "post";
        return Gx.ajax(url, data, success, error, async, config);
    };
    Gx.ajaxGet = function (url, data, success, error, async, config) {
        config = config || {};
        config.type = "get";
        return Gx.ajax(url, data, success, error, async, config);
    };


    var readyState = {
        "Uninitialized": 0,//（未初始化）还没有调用send()方法
        "Loading": 1,//（载入）已调用send()方法，正在发送请求
        "Loaded": 2,//（载入完成）send()方法执行完成，已经接收到全部响应内容
        "Interactive": 3,//（交互）正在解析响应内容
        "Completed": 4,//（完成）响应内容解析完成，可以在客户端调用了
    };
    var status = {
        "OK": 200,//一切正常
        "Not Modified": 304,//客户端有缓冲的文档并发出了一个条件性的请求（一般是提供If-Modified-Since头表示客户只想比指定日期更新的文档）。服务器告诉客户，原来缓冲的文档还可以继续使用
        "Not Found": 404,//无法找到指定位置的资源
    };

    //js原生ajax
    Gx.ajaxXHR = function (url, data, success, error, async, type) {
        var xhr = (function () {
            //#region 返回XMLHttpRequest
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest();
            }
            if (window.ActiveObject) {
                return new ActiveObject("Microsoft.XMLHTTP");
            }
            throw new Error("当前浏览器不支持使用Ajax");
            //#endregion
        })();

        //回调函数
        xhr.onreadystatechange = function () {

        };
        //发送请求 请求类型：GET/POST；请求地址；是否异步true/false
        xhr.open(type, url, async);
        //发送请求
        xhr.send(Gx.convert.objToJson(data));
    };

    //同时调用多个ajax
    Gx.ajaxWhen = function (ajaxArr, success, error) {
        if (!Gx.base.isArray(ajaxArr) || ajaxArr.length == 0) {
            throw new Error("ajaxArr必须为数组且不能为空！");
        }
        success = Gx.base.getDefault(success, function () { });
        error = Gx.base.getDefault(error, function () { });

        return $.when.apply($, ajaxArr).done(success).fail(error);
    };
})(window, jQuery);