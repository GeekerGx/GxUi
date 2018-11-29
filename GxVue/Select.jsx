/// <reference path="../Lib/Jquery/jquery-3.0.0.min.js" />
/// <reference path="../Script/Gx.Base.js" />
/// <reference path="../Lib/Vue/vue2.5.16.js" />
(function (win) {
    var Default = Vue.extend({
        render: function (h) {
            var that = this;
            var options = [];
            var valueF = Gx.base.isFunction(this.valueField);
            var textF = Gx.base.isFunction(this.textField);

            var conversion = function (item, index) {
                var value = item[that.valueField];
                if (valueF) {
                    value = that.valueField(item);
                }
                var text = item[that.textField];
                if (textF) {
                    text = that.textField(item);
                }
                options.push(
                    <option value={value}>{text}</option>
                );
            };
            this.fixedItems.map(conversion);
            this.data.map(conversion);

            return (
                <select onChange={this._baseChange}>
                    {options}
                </select>
            );
        },
        //计算属性
        computed: {
            text: {
                cache: false,
                get: function () {
                    var obj = this.$el;
                    return obj.options[obj.selectedIndex].text;
                }
            },
            value: {
                cache: false,
                get: function () {
                    var obj = this.$el;
                    return obj.value;
                },
                set: function (val) {
                    var obj = this.$el;
                    obj.value = val;
                }
            }
        },
        //侦听属性
        watch: {
        },
        //方法
        methods: {
            _baseChange: function () {
                //自定义change方法
                this.change();
            },
            appendChildTo: function (id) {
                document.getElementById(id).appendChild(this.$el);
            },
            getSelectedData: function () {
                var index = this.$el.selectedIndex;
                var options = Gx.base.arrPush(this.fixedItems, this.data);
                return options[index];
            }
        },
        data: function () {
            return {
            };
        },
        props: {
            //下拉框数据
            data: {
                "default": function () {
                    return [{ ID: "-1", NAME: "请选择" }];
                }
            },
            //val属性
            valueField: {
                "default": "ID"
            },
            //text值
            textField: {
                "default": "NAME"
            },
            //固定项：该选项一直存在
            fixedItems: {
                "default": function () {
                    return [];
                }
            },
            //change事件
            change: {
                "default": function () {
                    return function () { };
                }
            }
        }
    });

    Gx.ui.coms.Select = Default;

    Gx.ui.createSelect = function () {

        var paramObj = Gx.param.getSerializeParam(arguments);

        var option = new Default({ propsData: paramObj.obj[0] });

        if (paramObj.str[0]) {
            option = option.$mount("#" + paramObj.str[0]);
        }
        else {
            option = option.$mount();
        }
        return option;
    };
})(window);