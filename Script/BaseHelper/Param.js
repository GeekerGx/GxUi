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
        },
        _parentData: null,
        _dataStore: null,
        /**
         * 弹窗获取父页面的参数
         */
        get dataStore() {
            if (!this._parentData && window != top && parent.Gx) {
                var ts = Gx.url.getParam("timeStamp");
                var ds = null;
                if (ts) {
                    ds = parent.Gx.param._dataStore['ts_' + ts];
                } else {
                    ds = parent.Gx.param._dataStore;
                }
                this._parentData = Gx.base.createObject(ds);
            }
            if (!this._parentData) {
                this._parentData = {};
            }
            return this._parentData;
        },
        /**
         * 存在当前页面
         */
        set dataStore(option) {
            if (!this._dataStore) {
                this._dataStore = {};
            }
            this._dataStore = option;
        }
    };
    Gx.param = param;
})(window, jQuery);