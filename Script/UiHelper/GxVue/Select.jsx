

(function (win) {
    var optionObj = {};
    var setting = [
        //下拉框数据
        { field: "data", value: [{ ID: "-1", NAME: "请选择" }] },
        //val属性
        { field: "valueField", value: "ID" },
        //text值
        { field: "textField", value: "NAME" },
        //固定项：该选项一直存在
        { field: "fixedItems", value: [] },
        //change事件
        { field: "onChange", value: function () { } },
        //禁用
        { field: "disabled", value: false },
        //验证状态
        { field: "checked", value: true },
    ];

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
            //自定义onChange方法
            this.onChange();
        },
        getSelectedData: function () {
            var select = this.$refs.select;
            var index = select.selectedIndex;
            var options = Gx.base.arrPush(this.fixedItems, this.data);
            return options[index];
        },
    };

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj, setting));
    Gx.ui.coms.Select = Default;
    Gx.ui.createSelect = function (options) {
        var vueCom = this.createInstance(Default, options);
        return this.convertSelect(vueCom);
    };
    Gx.ui.convertSelect = function (vueCom) {
        var obj = this.vmProxy({
            get root() {
                return vueCom;
            },
        }, setting);
        
        //公开方法
        obj = this.vmProxy(obj, [
            { field: "getSelectedData" }
        ]);
        return obj;
    };
})(window);