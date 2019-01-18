
(function (win) {
    var optionObj = {};

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

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj));
    Gx.ui.coms.Default = Default;
    Gx.ui.createDefault = function (options) {
        return Gx.ui.createInstance(Default, options);
    };
})(window);