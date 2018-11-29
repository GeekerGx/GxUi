/// <reference path="../Lib/Jquery/jquery-3.0.0.min.js" />

//所有的方法集成在Gx下
(function (win) {
    win.Gx = {};
})(window);

//基础帮助类
(function (win) {
    var base = {};

    //深度复制
    var cloneObj = function (obj) {
        var copy;
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;
        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }
        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = cloneObj(obj[i]);
            }
            return copy;
        }
        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = cloneObj(obj[attr]);
            }
            return copy;
        }
        throw new Error("Unable to copy obj! Its type isn't supported.");
    };
    var prototype = Object.prototype.toString;
    base.isArray = function (obj) {
        return prototype.call(obj) == "[object Array]";
    };
    base.isObject = function (obj) {
        return prototype.call(obj) == "[object Object]";
    };
    base.isFunction = function (obj) {
        return prototype.call(obj) == "[object Function]";
    };
    base.isBoolean = function (obj) {
        return prototype.call(obj) == "[object Boolean]";
    };
    base.isString = function (obj) {
        return prototype.call(obj) == "[object String]";
    };
    base.isNumber = function (obj) {
        return prototype.call(obj) == "[object Number]";
    };

    //创建对象
    base.createObject = function (obj) {
        if (Gx.base.isArray(obj)) {
            return this.mergeParam([], obj);
        } else {
            return this.mergeParam({}, obj);
        }
    };

    //合并参数
    base.mergeParam = function (setting, newSetting) {
        return Object.assign(setting, newSetting);
    };
    base.arrPush=function(arr,obj){
        if(!Gx.base.isArray(arr)){
            console.error("对象不是数组！");
            return;
        }
        return arr.concat(obj);
    };
    Gx.base = base;
})(window);

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

//方法参数
(function (win, $) {
    var param = {
        getSerializeParam: function (paramList) {
            var paramObj = {
                str: [],
                obj: [],
                fun: []
            };
            for (i = 0; i < paramList.length; i++) {
                var item = paramList[i];
                if (item != null) {
                    switch (Object.prototype.toString.call(item)) {
                        case '[object String]':
                            paramObj.str.push(item);
                            break;
                        case '[object Function]':
                            paramObj.fun.push(item);
                            break;
                        default:
                            paramObj.obj.push(item);
                            break;
                    }
                }
            }
            return paramObj;
        }
    };
    Gx.param = param;
})(window, jQuery);

//转换帮助类
(function(win){
    var convert={
        ObjToJson:function(obj){
            return JSON.stringify(obj);
        },
        JsonToObj:function(json){
            return JSON.parse(json);
        }
    };
    Gx.convert=convert;
}(window));

//UI控件帮助类
(function (win) {
    var ui = {
        //组件库
        coms: {}
    };
    win.Gx.ui = ui;

})(window);