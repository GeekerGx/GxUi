//方法参数
(function () {
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
        },
        _dataStore: {
            _root: null,
        },
        setData: function (data, ts) {
            if (ts) {
                this._dataStore["ts_" + ts] = data;
            } else {
                this._dataStore._root = Gx.base.mergeParam(this._dataStore._root, data);
            }
        },
        _init: function () {
            if (!this._dataStore._root && window != top && parent.Gx) {
                var ts = Gx.url.getParam("timeStamp");
                var ds = parent.Gx.param._dataStore['ts_' + ts];
                this._dataStore._root = Gx.base.createObject(ds);
            }
        },
        get dataStore() {
            return this._dataStore._root;
        }
    };

    Gx.param = param;
})();