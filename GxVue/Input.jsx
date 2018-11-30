/// <reference path="../Lib/Jquery/jquery-3.0.0.min.js" />
/// <reference path="../Script/Gx.Base.js" />
/// <reference path="../Lib/Vue/vue2.5.16.js" />
(function (win) {
    var Default = Vue.extend({
        render: function (h) {
            var input = <input
                type={this.type}
                placeholder={this.placeholder}
                onChange={this._baseChange}
                onBlur={this._baseOnBlur}
                onFocus={this._baseOnFocus}
            />;
            switch (this.type) {
                case "textarea":
                    input.tag = "textarea";
                    break;
                case "number":
                    input.data.attrs.type = "text";
                    console.log(input);
                    break;
                default:
                    break;
            }
            return (input);
        },
        //计算属性
        computed: {
            value: {
                cache: false,
                get: function () {
                    var obj = this.$el;
                    return obj.value;
                },
                set: function (val) {
                    var obj = this.$el;
                    obj.value = val;
                    this._baseChange();
                }
            }
        },
        //侦听属性
        watch: {
        },
        //方法
        methods: {
            _baseChange: function () {
                this.change();
            },
            _baseOnBlur: function () {
                switch (this.type) {
                    case "number":
                        this.value = Gx.convert.toNumber(this.value, true);
                        break;
                    default:
                        break;
                }
                //验证
                if (this.validation(this.value)) {
                    this.onBlur();
                }
            },
            _baseOnFocus: function () {
                switch (this.type) {
                    case "number":
                        var num = this.value.toString().replace(/,/g, '');
                        if (num) {
                            this.value = Gx.convert.toNumber(num);
                        }
                        break;
                    default:
                        break;
                }
                this.onFocus();
            }
        },
        data: function () {
            return {
            };
        },
        props: {
            type: {
                "default": "text"
            },
            //提示
            placeholder: "",
            //验证方法
            validation: {
                "default": function () {
                    return function (value) {
                        return true;
                    };
                }
            },
            //change事件
            change: {
                "default": function () {
                    return function () {
                    };
                }
            },
            //失焦焦点
            onBlur: {
                "default": function () {
                    return function () {
                    };
                }
            },
            //获得焦点
            onFocus: {
                "default": function () {
                    return function () {
                    };
                }
            }
        }
    });

    Gx.ui.coms.Input = Default;

    Gx.ui.createInput = function () {

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