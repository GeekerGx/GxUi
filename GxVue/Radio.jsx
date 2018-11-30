/// <reference path="../Lib/Jquery/jquery-3.0.0.min.js" />
/// <reference path="../Script/Gx.Base.js" />
/// <reference path="../Lib/Vue/vue2.5.16.js" />
(function (win) {

    var Default = Vue.extend({
        render: function (h) {
            var that = this;
            var list = [];
            this.data.forEach(function (item, index) {
                list.push(<li><input type={that.multiple ? "checkbox" : "radio"} value={item.value} name={that.name} />{item.text}</li>);
            });
            return (
                <ul>
                    {list}
                </ul>
            );
        },
        //计算属性
        computed: {
            value: {
                cache: false,
                get: function () {
                    var list = this.$el.getElementsByTagName("input");
                    var checkedItem = {};
                    for (i = 0; i < list.length; i++) {
                        var item = list[i];
                        if (item.checked) {
                            checkedItem = item;
                        }
                    }

                    return checkedItem.value;
                },
                set: function (val) {
                    var list = this.$el.getElementsByTagName("input");
                    for (i = 0; i < list.length; i++) {
                        var item = list[i];
                        if (item.value == val) {
                            item.checked = true;
                        }
                    }
                }
            }
        },
        //侦听属性
        watch: {
        },
        //方法
        methods: {
            //重置
            reset: function () {
                var list = this.$el.getElementsByTagName("input");
                for (i = 0; i < list.length; i++) {
                    var item = list[i];
                    item.checked = false;
                }
            }
        },
        data: function () {
            return {
            };
        },
        props: {
            name: null,
            data: {
                "default": function () {
                    return function (value) {
                        return [];
                    };
                }
            },
            multiple: {
                "default": false
            }
        }
    });

    Gx.ui.coms.Input = Default;

    Gx.ui.createRadio = function () {

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