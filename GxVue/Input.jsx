/// <reference path="../Lib/Jquery/jquery-3.0.0.min.js" />
/// <reference path="../Script/Gx.Base.js" />
/// <reference path="../Lib/Vue/vue2.5.16.js" />
/// <reference path="VueBase.js" />

(function (win) {
    var optionObj = {};

    optionObj.render = function (h) {
        var input = <input
            class={[
                "form-control"
            ]}
            style={{
                "width": this.width
            }}
            type={this.type}
            placeholder={this.placeholder}
            onChange={this._baseChange}
            onBlur={this._baseOnBlur}
            onFocus={this._baseOnFocus}
            value={this.$data._isFocus ? this.value : this.text}
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
    };
    optionObj.computed = {
        text: {
            cache: false,
            get: function () {
                var num = this.value;
                switch (this.type) {
                    case "number":
                        if (num) {
                            num = Gx.convert.toNumber(num, this.micrometer);
                        }
                        break;
                    default:
                        break;
                }
                return num;
            }
        }
    };
    optionObj.methods = {
        _baseChange: function () {
            this.value = this.$el.value;
            this.change();
        },
        //失焦焦点
        _baseOnBlur: function () {
            this.$data._isFocus = false;
            this.onBlur();
            //验证
            if (this.validation(this.value)) {

            }
        },
        //获得焦点
        _baseOnFocus: function () {
            this.$data._isFocus = true;

            this.onFocus();
        }
    };
    optionObj.data = function () {
        return {
            _isFocus: false
        };
    };
    optionObj.props = {
        type: {
            "default": "text"
        },
        //提示
        placeholder: {
            "default": ""
        },
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
        value: {
            "default": ""
        },
        micrometer: {
            "default": false
        }
    };

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj));
    Gx.ui.coms.Input = Default;
    Gx.ui.createInput = function () {
        return Gx.ui.createInstance(Default, Gx.param.getSerializeParam(arguments));
    };
})(window);