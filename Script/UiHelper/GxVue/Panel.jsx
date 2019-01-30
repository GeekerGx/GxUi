

(function (win) {
    var optionObj = {};
    var setting = [
        { field: "id", value: "panel_" + Gx.base.getGuid(8, 16) },
        { field: "active", value: false }
    ];

    optionObj.render = function (h) {
        return (
            <div
                id={this.id}
                class={[
                    "tab-pane",
                    "fade",
                    this.active ? "active" : "",
                    this.active ? "in" : "",
                ]}
            >
                {this.$slots.default}
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