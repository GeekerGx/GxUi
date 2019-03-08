
(function (win) {
    var optionObj = {};
    var setting = [
        //输入框类型
        { field: "type", value: "text" },
        //输入框内容
        { field: "value", value: "" },
        //是否获得焦点
        { field: "isFocus", value: false },
        //预期值提示信息
        { field: "prompt", value: "" },
        //验证事件
        { field: "onValidation", value: function (val) { return true; } },
        //改变事件
        { field: "onChange", value: function () { } },
        //失焦事件
        { field: "onBlur", value: function () { } },
        //获得焦点事件
        { field: "onFocus", value: function () { } },
        //是否禁用
        { field: "disabled", value: false },
        //是否只读
        { field: "readonly", value: false },

        //#region 数字框属性

        //是否千分符
        { field: "isMicrometer", value: false },
        //小数点精度
        { field: "precision", value: false },//未开发
        //精度不足是否补0
        { field: "isPad", value: false },//未开发
        //前缀
        { field: "prefix", value: false },//未开发
        //后缀
        { field: "suffix", value: false },//未开发

        //#endregion
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
            placeholder={this.prompt}
            onChange={this._baseChange}
            onBlur={this._baseOnBlur}
            onFocus={this._baseOnFocus}
            value={this.$data.isFocus ? this.value : this.text}
            disabled={this.disabled ? "disabled" : null}
            readonly={this.readonly ? "readonly" : null}
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
                            num = Gx.convert.toNumber(num, this.isMicrometer);
                        }
                        break;
                    default:
                        break;
                }
                return num;
            },
            set: function (val) {
                throw new Error("请使用value属性进行赋值！");
            }
        }
    };
    optionObj.methods = {
        _baseChange: function () {
            this.value = this.$el.value;
            this.onChange();
        },
        //失焦焦点
        _baseOnBlur: function () {
            this.$data.isFocus = false;
            this.onBlur();
            //验证
            if (this.onValidation(this.value)) {

            }
        },
        //获得焦点
        _baseOnFocus: function () {
            this.$data.isFocus = true;

            this.onFocus();
        }
    };

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj, setting));
    Gx.ui.coms.Input = Default;
    Gx.ui.createInput = function (options) {
        var vueCom = this.createInstance(Default, options);
        return this.convertInput(vueCom);
    };
    Gx.ui.convertInput = function (vueCom) {

        var obj = this.vmProxy({
            get root() {
                return vueCom;
            },
        }, setting);

        //公开方法
        obj = this.vmProxy(obj, [
            { field: "text" }
        ]);

        return obj;
    };
})(window);