

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
        var vueCom = this.createInstance(Default, options);
        return this.convertTabs(vueCom);
    };
    Gx.ui.convertTabs = function (vueCom) {
        return this.vmProxy({
            get root() {
                return vueCom;
            },
        }, setting);
    };
})(window);