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
        getResultObj: function (optionObj, dataSetting) {
            if (dataSetting) {
                optionObj.data = function () {
                    var options = Gx.base.createObject(this.options);
                    var data = {};
                    dataSetting.map(function (item) {
                        data[item.field] = Gx.base.getDefault(options[item.field], item.value);
                    });
                    return data;
                };
            }

            var obj = Gx.base.mergeParam({
                mixins: [],
                components: {
                    'gx-button': this.coms.Button,
                    'gx-input': this.coms.Input,
                    'gx-panel': this.coms.Panel,
                    'gx-radio': this.coms.Radio,
                    'gx-select': this.coms.Select,
                    'gx-table': this.coms.Table,
                    'gx-toolbar': this.coms.Toolbar
                }
            }, optionObj);
            //添加基础混入
            obj.mixins = Gx.base.arrPush(obj.mixins, [mixins.base]);
            return obj;
        },
        createInstance: function (fun, options, setting) {
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
            return this.vmProxy({
                get root() {
                    return option;
                },
            }, setting);
        },
        vmProxy: function (target, keys) {
            keys = Gx.base.arrPush(keys, [
                { field: "appendChildTo" },
                { field: "show" },
                { field: "hide" },
                { field: "width" },
                { field: "display" },
            ]);
            keys.map(function (item) {
                Gx.base.objProxy(target, item.field, target.root, item.field);
            });
            return target;
        }
    };
    win.Gx.ui = ui;

})(window);