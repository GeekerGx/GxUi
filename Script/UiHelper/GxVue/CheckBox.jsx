(function (win) {
    var optionObj = {};
    var setting = [
        //组
        { field: "name", value: null },
        //数据
        { field: "data", value: [] },
        //多选
        { field: "multiple", value: false },
    ];

    optionObj.render = function (h) {
        var that = this;
        var list = [];
        this.data.forEach(function (item, index) {
            list.push(
                <li>
                    <input
                        type={that.multiple ? "checkbox" : "radio"}
                        value={item.value}
                        name={that.name}
                    />
                    {item.text}
                </li>
            );
        });
        return (
            <ul>
                {list}
            </ul>
        );
    };
    optionObj.computed = {
        value: {
            cache: false,
            get: function () {
                var list = this.$el.getElementsByTagName("input");
                var checkedItemList = [];
                for (i = 0; i < list.length; i++) {
                    var item = list[i];
                    if (item.checked) {
                        checkedItemList.push(item.value);
                    }
                }
                if (!this.multiple) {
                    return checkedItemList[0];
                }

                return checkedItemList;
            },
            set: function (val) {
                var list = this.$el.getElementsByTagName("input");
                var arr = [];
                if (!this.multiple && Gx.base.isArray(val)) {
                    console.log("multiple:", this.multiple);
                    console.log("value:", val);
                    throw new Error("单选框不能设置多个值！");
                }

                if (Gx.base.isArray(val)) {
                    arr = val;
                } else {
                    arr.push(val);
                }
                arr.map(function (val) {
                    for (i = 0; i < list.length; i++) {
                        var item = list[i];
                        if (item.value == val) {
                            item.checked = true;
                        }
                    }
                });
            }
        }
    };
    optionObj.methods = {
        reset: function () {
            var list = this.$el.getElementsByTagName("input");
            for (i = 0; i < list.length; i++) {
                var item = list[i];
                item.checked = false;
            }
        }
    };

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj, setting));
    Gx.ui.coms.CheckBox = Default;

    Gx.ui.createCheckBox = function (options) {
        var vueCom = this.createInstance(Default, options);
        return this.convertCheckBox(vueCom);
    };
    Gx.ui.convertCheckBox = function (vueCom) {
        var obj = this.vmProxy({
            get root() {
                return vueCom;
            },
        }, setting);

        //公开方法
        obj = this.vmProxy(obj, [
            { field: "reset" },
            { field: "value" },
        ]);
        return obj
    };
})(window);