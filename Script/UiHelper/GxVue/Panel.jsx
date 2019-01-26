

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

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj,setting));
    Gx.ui.coms.Panel = Default;
    Gx.ui.createPanel = function (options) {
        return this.createInstance(Default, options,setting);
    };
})(window);