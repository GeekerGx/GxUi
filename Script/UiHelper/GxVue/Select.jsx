

(function (win) {
    var optionObj = {};

    optionObj.render = function (h) {
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
            <div
                class={[
                    this.checked ? null : "has-error"
                ]}
            >
                <select
                    class={[
                        "form-control"
                    ]}
                    style={{
                        "width": this.width
                    }}
                    disabled={this.disabled ? "disabled" : null}
                    onChange={this._baseChange}
                    ref="select"
                >
                    {options}
                </select>
            </div>
        );
    };
    optionObj.computed = {
        text: {
            cache: false,
            get: function () {
                var select = this.$refs.select;
                return select.options[select.selectedIndex].text;
            }
        },
        value: {
            cache: false,
            get: function () {
                var select = this.$refs.select;
                return select.value;
            },
            set: function (val) {
                var select = this.$refs.select;
                select.value = val;
            }
        }
    };
    optionObj.methods = {
        _baseChange: function () {
            //自定义change方法
            this.change();
        },
        getSelectedData: function () {
            var select = this.$refs.select;
            var index = select.selectedIndex;
            var options = Gx.base.arrPush(this.fixedItems, this.data);
            return options[index];
        },
    };
    optionObj.data = function () {
        var data = Gx.base.createObject(this.options);
        return {
            //下拉框数据
            data: Gx.base.getDefault(data.data, [{ ID: "-1", NAME: "请选择" }]),
            //val属性
            valueField: Gx.base.getDefault(data.valueField, "ID"),
            //text值
            textField: Gx.base.getDefault(data.textField, "NAME"),
            //固定项：该选项一直存在
            fixedItems: Gx.base.getDefault(data.fixedItems, []),
            //change事件
            change: Gx.base.getDefault(data.change, function () { }),
            disabled: Gx.base.getDefault(data.disabled, false),
            checked: Gx.base.getDefault(data.checked, true)
        };
    };

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj));
    Gx.ui.coms.Select = Default;
    Gx.ui.createSelect = function (options) {
        return Gx.ui.createInstance(Default, options);
    };
})(window);