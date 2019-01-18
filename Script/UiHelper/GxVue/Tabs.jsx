

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

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj));
    Gx.ui.coms.Tabs = Default;
    Gx.ui.createTabs = function () {
        return Gx.ui.createInstance(Default, Gx.param.getSerializeParam(arguments));
    };
})(window);