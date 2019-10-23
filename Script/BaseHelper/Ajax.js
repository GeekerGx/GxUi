//ajax帮助类
(function () {

    Gx.ajaxPost = function (url, param, success, error, async) {
        return Gx.ajax(url, param, success, error, async, "POST");
    };
    Gx.ajaxGet = function (url, param, success, error, async) {
        return Gx.ajax(url, param, success, error, async, "GET");
    };

    var setting = {
        url: "",
        type: "POST",
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
            url: Gx.config.ajax.urlPrefix + url,
            type: type,
            async: async,
            param: param,
            success: success,
            error: error,
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
        xhr.onprogress = function () { };
        xhr.onloadend = function () { };
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
        //发送请求 请求类型：GET/POST；请求地址；是否异步true/false
        xhr.open(ajaxObj.type, ajaxObj.url, ajaxObj.async);
        //发送请求
        xhr.send(Gx.convert.objToJson(ajaxObj.param));
    };

    //同时调用多个ajax
    Gx.ajaxWhen = function (ajaxArr, success, error) {
        throw new Error("该方法正在被优化！");
        /*if (!Gx.base.isArray(ajaxArr) || ajaxArr.length == 0) {
            throw new Error("ajaxArr必须为数组且不能为空！");
        }
        success = Gx.base.getDefault(success, function () { });
        error = Gx.base.getDefault(error, function () { });

        return $.when.apply($, ajaxArr).done(success).fail(error);*/
    };
})();