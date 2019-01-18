

(function (win) {
    var optionObj = {};

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
    optionObj.data = function () {
        var data = Gx.base.createObject(this.options);
        return {
            name: Gx.base.getDefault(data.name, null),
            data: Gx.base.getDefault(data.data, []),
            multiple: Gx.base.getDefault(data.multiple, false)
        };
    };

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj));
    Gx.ui.coms.Radio = Default;
    Gx.ui.createRadio = function (options) {
        return Gx.ui.createInstance(Default, options);
    };
})(window);