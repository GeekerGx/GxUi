

(function (win) {
    var optionObj = {};

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

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj));
    Gx.ui.coms.Panel = Default;
    Gx.ui.createPanel = function (options) {
        return Gx.ui.createInstance(Default, options);
    };
})(window);