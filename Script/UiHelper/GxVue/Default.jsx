
(function (win) {
    var optionObj = {};
    var setting = [];

    optionObj.render = function (h) {
        if (!this.display) {
            return;
        }
        var props = {
            options: {
                value: "按钮"
            }
        };
        return (
            <div>
                这里是pane
                <gx-button {...{ props }} />
            </div>
        );
    };

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj,setting));
    Gx.ui.coms.Default = Default;
    Gx.ui.createDefault = function (options) {
        return this.createInstance(Default, options,setting);
    };
})(window);