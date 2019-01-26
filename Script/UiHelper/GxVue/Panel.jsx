

(function (win) {
    var optionObj = {};
    var setting = [];

    optionObj.render = function (h) {
        return (
            <div
                style={{
                    display: this.display ? "" : "none"
                }}
            >
            </div>
        );
    };

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj, setting));
    Gx.ui.coms.Panel = Default;

    Gx.ui.createPanel = function (options) {
        var vueCom = this.createInstance(Default, options);
        return this.convertPanel(vueCom);
    };
    Gx.ui.convertPanel = function (vueCom) {
        return this.vmProxy({
            get root() {
                return vueCom;
            },
        }, setting);
    };
})(window);