//UI控件帮助类
(function (win) {
    var devHelper = {
        flag: false,
        callFun: function (type) {
            if (!devHelper.flag) {
                return;
            }

            devHelper.logThis.call(this, type);
        },
        logThis: function (msg) {
            console.log(msg, this);
        }
    };
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
                beforeCreate: function () {
                    devHelper.callFun.call(this, "beforeCreate");
                },
                //创建后
                created: function () {
                    devHelper.callFun.call(this, "created");
                },
                //挂载前
                beforeMount: function () {
                    devHelper.callFun.call(this, "beforeMount");
                },
                //挂载后
                mounted: function () {
                    devHelper.callFun.call(this, "mounted");
                },
                updated: function () {
                    devHelper.callFun.call(this, "updated");
                },
                //传入数据
                props: {
                    width: {
                        "default": "200px"
                    },
                    display: {
                        "default": true
                    }
                },
                components: {
                    'gx-button': Gx.ui.coms.Button,
                    'gx-input': Gx.ui.coms.Input,
                    'gx-panel': Gx.ui.coms.Panel,
                    'gx-radio': Gx.ui.coms.Radio,
                    'gx-select': Gx.ui.coms.Select,
                    'gx-table': Gx.ui.coms.Table,
                    'gx-toolbar': Gx.ui.coms.Toolbar
                }
            }, optionObj);
            return obj;
        },
        createInstance: function (fun, paramObj) {
            var optionObj = paramObj.obj[0];
            var option = new fun({
                //el: "#" + paramObj.str[0],
                propsData: optionObj
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