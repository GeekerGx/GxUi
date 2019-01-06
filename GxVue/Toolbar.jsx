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

        var buttonSettings = [];
        for (var i = 0; i < that.data.length; i++) {
            var item=that.data[i];
            item = Gx.base.mergeParam(getButtonSetting(), item);
            item.onClick = function () {
                if (item.onClick) {
                    item.onClick.call(that.$refs[item.id]);
                }
            };
            buttonSettings.push(
                <button
                    ref={item.id}
                    class={["btn", "navbar-btn", "btn-default"]}
                    type="button"
                    disabled={!item.enabled}
                    onClick={item.onClick}
                >
                    {item.value}
                </button>
            );
        }
        return (
            <div>
                {buttonSettings}
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