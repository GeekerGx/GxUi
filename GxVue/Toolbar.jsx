/// <reference path="../Lib/Jquery/jquery-3.0.0.min.js" />
/// <reference path="../Script/Gx.Base.js" />
/// <reference path="../Lib/Vue/vue2.5.16.js" />

(function (win) {

    var optionObj = {};
    optionObj.render = function (h) {
        if (!this.display) {
            return;
        }
        return (
            <div
                ref="toolbar"
            >
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
    optionObj.mounted = function () {
        var that = this;

        var that = this;

        that.data.map(function (item) {
            if (Gx.ui.checkSysKeepKey(item.id)) {
                item.id = item.id + "" + Gx.base.getGuid(8, 16);
            }
            item.id = item.id || Gx.base.getGuid(8, 16);
            that[item.id] = Gx.ui.createButton(item);
            that[item.id].appendChildTo(that.$refs.toolbar);
        });

    };
    var Default = Vue.extend(Gx.ui.getResultObj(optionObj));

    Gx.ui.coms.Toolbar = Default;

    Gx.ui.createToolbar = function () {
        return Gx.ui.createInstance(Default, Gx.param.getSerializeParam(arguments));
    };
})(window);