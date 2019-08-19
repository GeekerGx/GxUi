//ajax帮助类
(function (win, $) {

    /* //默认配置
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
    };*/

    Gx.ajaxPost = function (url, param, success, error, async) {
        return Gx.ajax(url, param, success, error, async, "POST");
    };
    Gx.ajaxGet = function (url, param, success, error, async) {
        return Gx.ajax(url, param, success, error, async, "GET");
    };

    var setting = {
        url: "",
        type: "post",
        timeout: 1000 * 60,
        async: true,
        param: {},
        success: function (data) { },
        error: function (data) {
            alert(data);
        },
    };
    //js原生ajax
    Gx.ajax = function (url, param, success, error, async, type) {
        var that = this;
        var ajaxObj = Gx.base.mergeParam(setting, {
            url: url,
            type: type || undefined,
            async: async,
            param: param || undefined,
            success: success,
            error: error || undefined,
        });
        var xhr = (function () {
            //#region 返回XMLHttpRequest
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest();
            }
            throw new Error("当前浏览器不支持使用Ajax");
            //#endregion
        })();

        //回调函数
        if (ajaxObj.async) {
            xhr.timeout = ajaxObj.timeout;
        }
        xhr.responseType = "";
        xhr.onreadystatechange = function () { };
        xhr.abort = function () { };
        xhr.ontimeout = function () {
            alert("ajax超时");
        };
        xhr.onerror = function () {
            alert("ajax失败");
        };

        xhr.onloadstart = function () {
            //在发送请求前的准备
        };
        //#region 发送数据阶段
        xhr.upload.onloadstart = function () { };
        xhr.upload.onload = function () { };
        xhr.upload.onprogress = function () { };
        xhr.upload.onloadend = function () { };
        //#endregion
        xhr.onprogress = function () { };
        xhr.onload = function () {
            //对获取的数据进行处理，目前支持string/标准json对象/arr数组
            var resultObj = (function (result) {
                try {
                    var obj = Gx.convert.jsonToObj(result);
                    if (Gx.base.isObject(obj) || Gx.base.isArray(obj)) {
                        return obj;
                    }
                } catch (e) { }
                return result;
            })(this.responseText);

            if ((this.status < 200 || this.status >= 300) && this.status != 304) {
                switch (this.status) {
                    default:
                        //其他类型异常
                        alert(resultObj);
                        break
                }
                return;
            }

            //请求成功
            (function (result) {
                if (result.state === false) {
                    if (Gx.base.isFunction(ajaxObj.error)) {
                        ajaxObj.error(result);
                    } else {
                        alert(result.msg);
                    }
                    return;
                }
                if (Gx.base.isFunction(ajaxObj.success)) {
                    ajaxObj.success(result);
                    return;
                }
            })(resultObj);
        };
        xhr.onloadend = function () { };
        //发送请求 请求类型：GET/POST；请求地址；是否异步true/false
        xhr.open(ajaxObj.type, ajaxObj.url, ajaxObj.async);
        //发送请求
        xhr.send(Gx.convert.objToJson(ajaxObj.param));
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