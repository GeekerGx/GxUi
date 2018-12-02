/// <reference path="Gx.Base.js" />
/// <reference path="../Lib/Layer/layer.js" />
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
        maxWidth: 850,//最大宽度
        maxHeight: 500,//最大高度
        success: function (layero, index) { }, //层弹出后的成功回调方法
        end: function () { },
    };

    //弹出窗
    (function (win, $) {
        var layerObj = Gx.base.createObject(_setting);

        layerObj = Gx.base.mergeParam(layerObj, {
            type: 2,
            success: function success(layero, index) {
                _layer.iframeAuto(index);
            }
        });

        layer.openIframe = function (url, title, endFun, width, height) {
            var setting = {
                content: url,
                title: title || false,
                area: width ? (height ? [width, height] : width) : 'auto',
                end: Gx.base.isFunction(endFun) ? endFun : null
            };
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

    Gx.layer = layer;
})(window);