//UI控件帮助类
(function (win) {
    var ui = {
        //组件库
        coms: {},
        checkSysKeepKey: function (key) {
            if (!key) {
                return false;
            }
            var sysKeepKeys = ["display"];
            return sysKeepKeys.indexOf(key.toLowerCase()) > -1;
        },
        getResultObj: function (optionObj) {
            var obj = Gx.base.mergeParam({
                //生成元素
                render: function (h) {
                    return (null);
                },
                //计算属性
                computed: {},
                //侦听属性
                watch: {},
                //方法
                methods: {
                    //添加到元素后面
                    appendChildTo: function (obj) {
                        switch (Gx.base.getObjType(obj)) {
                            case "[object String]":
                                document.getElementById(id).appendChild(this.$el);
                                break;
                            case "[object HTMLDivElement]":
                                obj.appendChild(this.$el);
                                break;
                        }
                    },
                    show: function () {
                        this.display = true;
                    },
                    hide: function () {
                        this.display = false;
                    }
                },
                //内置数据
                data: function () {
                    return {};
                },
                //创建前
                beforeCreate: function () { },
                //创建后
                created: function () { },
                //挂载前
                beforeMount: function () { },
                //挂载后
                mounted: function () { },
                updated: function () { },
                //传入数据
                props: {
                    width: {
                        "default": "200px"
                    },
                    display: {
                        "default": true
                    }
                }
            }, optionObj);
            return obj;
        },
        createInstance: function (fun, paramObj) {

            var option = new fun({
                propsData: paramObj.obj[0]
            });
            if (paramObj.str[0] && document.getElementById(paramObj.str[0])) {
                option = option.$mount("#" + paramObj.str[0]);
            } else {
                option = option.$mount();
            }
            return option;
        }
    };
    win.Gx.ui = ui;
})(window);