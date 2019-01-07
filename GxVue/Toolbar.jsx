/// <reference path="../Lib/Jquery/jquery-3.0.0.min.js" />
/// <reference path="../Script/Gx.Base.js" />
/// <reference path="../Lib/Vue/vue2.5.16.js" />

(function (win) {

    var getButtonSetting = function () {
        return {
            id: Gx.base.getGuid(8, 16),
            value: "button",
            enabled: true,
            onClick: function () { },
        };
    };
    var optionObj = {};
    optionObj.render = function (h) {
        var that = this;

        var buttons = [];
        for (var i = 0; i < that.data.length; i++) {
            that.data[i] = Gx.base.mergeParam(getButtonSetting(), that.data[i]);
            var item = that.data[i];
            buttons.push(
                <button
                    ref={item.id}
                    class={["btn", "navbar-btn", "btn-default"]}
                    type="button"
                    disabled={!item.enabled}
                    onClick={function () {
                        console.log(item);
                        item.onClick();
                        that.$forceUpdate();
                    }}
                >
                    {item.value}
                </button>
            );
        }

        return (
            <div>
                {buttons}
            </div>
        );
    };

    optionObj.props = {
        data: {
            "default": function () {
                return [];
            }
        },
    };
    var Default = Vue.extend(Gx.base.mergeParam(Gx.ui.getDefaultObj(), optionObj));

    Gx.ui.coms.Toolbar = Default;

    Gx.ui.createToolbar = function () {
        return Gx.ui.createInstance(Default, Gx.param.getSerializeParam(arguments));
    };
})(window);