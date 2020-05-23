//UI控件帮助类
(function (win) {
    var devHelper = {
        callFun: function (type) {
            if (!Gx.config.devFlag) {
                return;
            }

            devHelper.logThis.call(this, type);
        },
        logThis: function (type) {
            if (type == "created") {
                console.log(type, this);
            }
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
                },
                /**
                 * 清除当前组件
                 */
                remove: function () {
                    this.$el.remove();
                },
            },
            //内置数据
            data: function () {
                var data = this.options;
                return {
                    id: Gx.base.getDefault(data.el, ""),
                    width: Gx.base.getDefault(data.width, "200px"),
                    //显示状态
                    display: Gx.base.getDefault(data.display, true),
                    //启用状态
                    enabled: Gx.base.getDefault(data.enabled, true),
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
            var sysKeepKeys = ["appendChildTo", "remove", "width", "hide", "show", "display"];
            return sysKeepKeys.indexOf(key.toLowerCase()) > -1;
        },
        getResultObj: function (optionObj, dataSetting) {
            if (dataSetting) {
                optionObj.data = function () {
                    var options = this.options;
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
                },
                //侦听属性
                watch: {},
            }, optionObj);
            //添加基础混入
            obj.mixins = Gx.base.arrPush(obj.mixins, [mixins.base]);
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
        },
        vmProxy: function (target, keys) {
            keys = Gx.base.arrPush(keys, [
                { field: "appendChildTo" },
                { field: "show" },
                { field: "hide" },
                { field: "width" },
                { field: "display" },
                { field: "remove" },
            ]);
            keys.map(function (item) {
                Gx.base.objProxy(target, item.field, target.root, item.field, item.setCheckFun);
            });
            return target;
        }
    };
    win.Gx.ui = ui;

})(window);