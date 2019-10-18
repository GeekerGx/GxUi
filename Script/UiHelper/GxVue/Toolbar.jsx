(function (win) {
    var optionObj = {};
    var setting = [
        //按钮数据
        { field: "data", value: [] },
    ];

    optionObj.render = function (h) {
        var that = this;

        return (
            <div
                style={{
                    display: !this.display ? "none" : ""
                }}
                class={[
                    "btn-group"
                ]}
            >
                {this.data.map(function (item) {
                    if (Gx.ui.checkSysKeepKey(item.id)) {
                        item.id = item.id + "" + Gx.base.getGuid(8, 16);
                    }
                    item.id = item.id || Gx.base.getGuid(8, 16);
                    item.size="xs";

                    var props = { options: Gx.base.createObject(item) };

                    return (<gx-button {...{ props }}
                        ref={item.id}
                    />);
                })}
            </div >
        );
    };
    optionObj.computed = {
        root: function () {
            return Gx.ui.convertToolbar(this);
        }
    };

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj, setting));
    Gx.ui.coms.Toolbar = Default;
    Gx.ui.createToolbar = function (options) {
        var that = this;
        var vueCom = this.createInstance(Default, options);
        return this.convertToolbar(vueCom);
    };
    Gx.ui.convertToolbar = function (vueCom) {
        var obj = this.vmProxy({
            get root() {
                return vueCom;
            },
        }, setting);

        Gx.base.addGetSetFun(obj, "buttons", function () {
            var buttons = {};
            obj.root.$children.map(function (item) {
                var button = item.root;
                buttons[button.id] = button;
            });
            return buttons;
        }, null);
        return obj;
    };
})(window);