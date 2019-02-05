//基础帮助类
(function (win) {
    var base = {};

    //#region 对象类型

    base.getObjType = function (obj) {
        return Object.prototype.toString.call(obj);
    };
    base.isArray = function (obj) {
        return this.getObjType(obj) == "[object Array]";
    };
    base.isObject = function (obj) {
        return this.getObjType(obj) == "[object Object]";
    };
    base.isFunction = function (obj) {
        return this.getObjType(obj) == "[object Function]";
    };
    base.isBoolean = function (obj) {
        return this.getObjType(obj) == "[object Boolean]";
    };
    base.isString = function (obj) {
        return this.getObjType(obj) == "[object String]";
    };
    base.isNumber = function (obj) {
        return this.getObjType(obj) == "[object Number]";
    };
    base.isHtml = function (obj) {
        return this.getObjType(obj) == "[object HTMLDivElement]";
    };

    //#endregion

    //深度复制
    var cloneObj = function (obj, base) {
        base = base || obj;
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
                copy[i] = cloneObj(obj[i], base);
            }
            return copy;
        }
        if (obj instanceof HTMLDivElement) {
            return obj;
        }
        // js一切皆对象
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = cloneObj(obj[attr], base);
            }
            return copy;
        }
        console.log(obj, base);
        throw new Error("Unable to copy obj! Its type isn't supported.");
    };

    //合并参数
    base.mergeParam = function (setting, newSetting) {
        return jQuery.extend(true, {}, cloneObj(setting), cloneObj(newSetting))
    };

    //创建对象
    base.createObject = function (obj) {
        if (this.isArray(obj)) {
            return this.mergeParam([], obj);
        } else {
            return this.mergeParam({}, obj);
        }
    };

    //
    base.arrPush = function (arr, obj) {
        if (!this.isArray(arr)) {
            console.error("对象不是数组！");
            return;
        }
        return arr.concat(obj);
    };

    //获取guid
    base.getGuid = function (length, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        radix = radix || chars.length;
        var arr = [];
        if (length) {
            for (var i = 0; i < length; i++) {
                arr[i] = chars[0 | Math.random() * radix];
            }
        } else {
            arr[8] = arr[13] = arr[18] = arr[23] = "-";
            arr[14] = "4";
            for (var i = 0; i < 36; i++) {
                if (arr[i]) {
                    continue;
                }
                var c = 0 | Math.random() * 16;
                arr[i] = chars[i == 19 ? (c & 0x3) | 0x8 : c];
            }
        }
        return arr.join("");
    };

    //如果不存在则取默认值
    base.getDefault = function (value, def) {
        return value != undefined && value != null ? value : def;
    };

    //对象代理
    base.objProxy = function (targetObj, targetKey, sourceObj, sourceKey, setCheckFun) {
        Object.defineProperty(targetObj, targetKey, {
            enumerable: true,
            configurable: true,
            get: function () {
                return sourceObj[sourceKey]
            },
            set: function (val) {
                if (setCheckFun && !setCheckFun(val)) {
                    throw new Error("set时检查不通过！");
                }
                sourceObj[sourceKey] = val;
            }
        });
    };
    base.addGetSetFun = function (obj, key, getFun, setFun) {
        getFun = getFun || function () {
            return null;
        };
        setFun = setFun || function (val) { };
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: getFun,
            set: setFun
        });
    };

    Gx.base = base;
})(window);