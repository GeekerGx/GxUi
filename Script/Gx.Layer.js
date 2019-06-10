//封装Layer
(function (win) {
    var _layer = Gx.base.createObject(win.layer);
    var layer = {};

    var _setting = {
        type: 0, //基本层类型
        title: false, //标题
        content: '', //内容
        area: 'auto', //宽高
        offset: 'auto', //坐标
        closeBtn: 0, //关闭按钮
        shadeClose: true, //是否点击遮罩关闭
        resize: false, //是否允许拉伸
        maxWidth: 850, //最大宽度
        maxHeight: 500, //最大高度
        success: function (layero, index) { }, //层弹出后的成功回调方法
        end: function () { },
    };

    //弹出窗
    (function (win, $) {
        var layerObj = Gx.base.createObject(_setting);

        layerObj = Gx.base.mergeParam(layerObj, {
            type: 2
        });

        layer.openIframe = function (url, title, param, endFun, width, height) {
            var timeStamp = Gx.dateTime.getTimeStamp();
            url = Gx.url.addParam(url, 'timeStamp', timeStamp);

            var setting = {
                content: url,
                title: title || false,
                area: width ? (height ? [width, height] : width) : 'auto',
                end: Gx.base.isFunction(endFun) ? endFun : null,
                success: function (layero, index) {
                    //如果未设置宽高则自适应
                    if (!width && !height) {
                        _layer.iframeAuto(index);
                    }
                }
            };
            if (!Gx.param._dataStore) {
                Gx.param._dataStore = {};
            }
            //设置参数
            Gx.param.setData(param, timeStamp);

            layerObj = Gx.base.mergeParam(layerObj, setting);
            return _layer.open(layerObj);
        };
    })(window);

    //重写Alter
    (function (win) {
        win.alert = function (msg) {
            //如果是对象则转成json
            if (Gx.base.isObject(msg)) {
                msg = Gx.convert.objToJson(msg);
            }
            _layer.msg(msg);
        };
    })(window);

    //重写Confirm
    (function (win) {
        win.confirm = function (msg, successFun, errorFun) {
            _layer.confirm(msg, {
                btn: ["Yes", "No"]
            },
                function (index) {
                    if (!successFun) {
                        _layer.close(index);
                        return;
                    }
                    if (successFun()) {
                        _layer.close(index);
                    }
                },
                function (index) {
                    if (!errorFun) {
                        _layer.close(index);
                        return;
                    }
                    if (errorFun()) {
                        _layer.close(index);
                    }
                });
        };
    })(window);

    Gx.layer = layer;
})(window);