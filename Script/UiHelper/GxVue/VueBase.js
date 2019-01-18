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
    var mixins = {
        base: {
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
                            document.getElementById(obj).appendChild(this.$el);
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
                var data = Gx.base.createObject(this.options);
                return {
                    width: Gx.base.getDefault(data.width, "200px"),
                    display: Gx.base.getDefault(data.display, true)
                };
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
                options: {
                    "default": function () {
                        return {};
                    }
                }
            },
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
                mixins: [mixins.base],
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
        createInstance: function (fun, options) {
            var option = new fun({
                propsData: {
                    options: options
                }
            });
            if (options.el && document.getElementById(options.el)) {
                option = option.$mount("#" + options.el);
            } else {
                option = option.$mount();
            }
            return option;
        }
    };
    win.Gx.ui = ui;

})(window);