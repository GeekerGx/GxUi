

(function (win) {
    var optionObj = {};
    var setting = [];

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

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj, setting));
    Gx.ui.coms.Tabs = Default;
    Gx.ui.createTabs = function (options) {
        return this.createInstance(Default, options, setting);
    };
})(window);