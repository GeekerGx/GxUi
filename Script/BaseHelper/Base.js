//基础帮助类
(function () {
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
    base.isDate = function (obj) {
        return this.getObjType(obj) == "[object Date]";
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
        if (Gx.base.isObject(obj)) {
            if (obj == {}) {
                return {};
            }
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = cloneObj(obj[attr], base);
            }
            return copy;
        }
        console.log(obj, base);
        throw new Error("Unable to copy obj! Its type isn't supported.");
    };

    //创建对象
    base.createObject = function (obj) {
        return cloneObj(obj);
    };

    //合并参数
    base.mergeParam = function (setting, newSetting) {
        var newDestination = this.createObject(setting);
        var newSource = this.createObject(newSetting);
        for (var property in newSource) {
            var obj = newSource[property];
            if (obj !== null && obj !== undefined) {
                newDestination[property] = obj;
            }
        }
        return newDestination;
    };

    /**
     * 数组合并
     * @param  {Array} arr  数组
     * @param  {Array|Object} obj  数组或对象
     * @returns {Array} 合并后的数组
     * @desc 如果obj为对象则往arr中插入一条数据，如果为数组则追加到arr之后
     */
    base.arrPush = function (arr, obj) {
        if (!this.isArray(arr)) {
            throw new Error("对象不是数组，无法进行合并！");
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
        return value === undefined || value === null ? def : value;
    };

    /**
     * 添加Get Set属性
     * @param  {Object} obj  需要添加的对象
     * @param  {String} key  需要添加的属性名称
     * @param  {Function} getFun  Get方法
     * @param  {Function} setFun  Set方法
     * @desc 此方法直接对传入的对象进行操作
     */
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

    //对象代理
    base.objProxy = function (targetObj, targetKey, sourceObj, sourceKey, setCheckFun) {
        this.addGetSetFun(
            targetObj,
            targetKey,
            function () {
                return sourceObj[sourceKey]
            },
            function (val) {
                if (setCheckFun && !setCheckFun(val)) {
                    throw new Error("set时检查不通过！");
                }
                sourceObj[sourceKey] = val;
            });
    };
    base.importLink = function (src) {
        var head = document.querySelector('head');
        var thisPath = document.currentScript.src;
        var libPath = thisPath.substring(0, thisPath.lastIndexOf('/')) + "/Lib/";

        var link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = libPath + src;

        head.appendChild(link);
    };
    base.importScript = function (src, onload) {
        var head = document.querySelector('head');
        var thisPath = document.currentScript.src;
        var libPath = thisPath.substring(0, thisPath.lastIndexOf('/')) + "/Lib/";

        var script = document.createElement('script');
        script.onload = onload || function () { };
        script.src = libPath + src;

        head.appendChild(script);
    };

    Gx.base = base;
})();