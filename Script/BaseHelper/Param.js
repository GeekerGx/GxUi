
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
