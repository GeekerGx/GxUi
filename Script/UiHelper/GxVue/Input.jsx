
(function (win) {
    var optionObj = {};
    var setting = [
        { field: "isFocus", value: false },
        { field: "type", value: "text" },
        { field: "placeholder", value: "" },
        { field: "validation", value: function (value) { return true; } },
        { field: "change", value: function () { } },
        { field: "onBlur", value: function () { } },
        { field: "onFocus", value: function () { } },
        { field: "value", value: "" },
        { field: "micrometer", value: false },
    ];

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
            value={this.$data.isFocus ? this.value : this.text}
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
            this.$data.isFocus = false;
            this.onBlur();
            //验证
            if (this.validation(this.value)) {

            }
        },
        //获得焦点
        _baseOnFocus: function () {
            this.$data.isFocus = true;

            this.onFocus();
        }
    };

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj,setting));
    Gx.ui.coms.Input = Default;
    Gx.ui.createInput = function (options) {
        return Gx.ui.createInstance(Default, options,setting);
    };
})(window);