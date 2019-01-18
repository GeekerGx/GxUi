
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
        var data = Gx.base.createObject(this.options);
        return {
            _isFocus: false,
            type: Gx.base.getDefault(data.type, "text"),
            //提示
            placeholder: Gx.base.getDefault(data.placeholder, ""),
            //验证方法
            validation: Gx.base.getDefault(data.validation, function (value) { return true; }),
            //change事件
            change: Gx.base.getDefault(data.change, function () { }),
            //失焦焦点
            onBlur: Gx.base.getDefault(data.onBlur, function () { }),
            //获得焦点
            onFocus: Gx.base.getDefault(data.onFocus, function () { }),
            value: Gx.base.getDefault(data.value, ""),
            micrometer: Gx.base.getDefault(data.micrometer, false)
        };
    };

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj));
    Gx.ui.coms.Input = Default;
    Gx.ui.createInput = function (options) {
        return Gx.ui.createInstance(Default, options);
    };
})(window);