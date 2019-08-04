
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
            <div class="btn-group btn-group-justified" role="group" aria-label="...">
                <div class="btn-group" role="group">
                    <gx-button {...{ props }} />
                </div>
                <div class="btn-group" role="group">
                    <gx-button {...{ props }} />
                </div>
                <div class="btn-group" role="group">
                    <gx-button {...{ props }} />
                </div>
            </div>
        );
    };

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj, setting));
    Gx.ui.coms.Default = Default;
    Gx.ui.createButtonGroups = function (options) {
        var obj = this.createInstance(Default, options, setting);
        return this.convertButtonGroups(obj);
    };
    Gx.ui.convertButtonGroups = function (vueCom) {
        return this.vmProxy({
            get root() {
                return vueCom;
            },
        }, setting);
    };
})(window);