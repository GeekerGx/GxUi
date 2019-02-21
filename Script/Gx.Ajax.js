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
        beforeSend: function beforeSend() {}, //发送请求前
        complete: function complete() {}, //请求完成后调用的回调函数（请求成功或失败时均调用）
        success: function success(data) {}, //请求成功后调用的回调函数
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
        var ajaxObj = Gx.base.mergeParam(Gx.base.createObject(_setting), config);
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
    //同时调用多个ajax
    Gx.ajaxWhen = function (ajaxArr, success, error) {
        if (!Gx.base.isArray(ajaxArr) || ajaxArr.length == 0) {
            throw new Error("ajaxArr必须为数组且不能为空！");
        }
        success = Gx.base.getDefault(success, function () {});
        error = Gx.base.getDefault(error, function () {});

        return $.when.apply($, ajaxArr).done(success).fail(error);
    };
})(window, jQuery);