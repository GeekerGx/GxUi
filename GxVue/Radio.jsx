/// <reference path="../Lib/Jquery/jquery-3.0.0.min.js" />
/// <reference path="../Script/Gx.Base.js" />
/// <reference path="../Lib/Vue/vue2.5.16.js" />
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
        //重置
        reset: function () {
            var list = this.$el.getElementsByTagName("input");
            for (i = 0; i < list.length; i++) {
                var item = list[i];
                item.checked = false;
            }
        }
    };
    optionObj.props = {
        name: null,
        data: {
            "default": function () {
                return function (value) {
                    return [];
                };
            }
        },
        multiple: {
            "default": false
        }
    };
    var Default = Vue.extend(Gx.ui.getResultObj(optionObj));

    Gx.ui.coms.Radio = Default;

    Gx.ui.createRadio = function () {
        return Gx.ui.createInstance(Default, Gx.param.getSerializeParam(arguments));
    };
})(window);