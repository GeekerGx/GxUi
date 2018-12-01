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
                value={this._isFocus ? this.value : this.text}
            />;
            switch (this.type) {
                case "textarea":
                    input.tag = "textarea";
                    break;
                case "number":
                    input.data.attrs.type = "text";
                    break;
                default:
                    break;
            }
            return (input);
        },
        //计算属性
        computed: {
            text: {
                cache: false,
                get: function () {
                    var num = this.value;
                    switch (this.type) {
                        case "number":
                            num = Gx.convert.toNumber(num, true);
                            break;
                        default:
                            break;
                    }
                    return num;
                }
            }
        },
        //侦听属性
        watch: {
        },
        //方法
        methods: {
            _baseChange: function () {
                this.value = this.$el.value;
                this.change();
            },
            //失焦焦点
            _baseOnBlur: function () {
                this._isFocus = false;
                this.onBlur();
                //验证
                if (this.validation(this.value)) {

                }
            },
            //获得焦点
            _baseOnFocus: function () {
                this._isFocus = true;

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
            },
            value: "",
            _isFocus: false
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