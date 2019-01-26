(function (win) {
    var optionObj = {};
    var setting = [
        { field: "data", value: [] },
    ];

    optionObj.render = function (h) {
        var that = this;

        return (
            <div
                style={{
                    display: !this.display ? "none" : ""
                }}
            >
                {this.data.map(function (item) {
                    if (Gx.ui.checkSysKeepKey(item.id)) {
                        item.id = item.id + "" + Gx.base.getGuid(8, 16);
                    }
                    item.id = item.id || Gx.base.getGuid(8, 16);

                    var props = { options: Gx.base.createObject(item) };

                    return (<gx-button {...{ props }}
                        on-changeById={that.changeById}
                        ref={item.id}
                    />);
                })}
            </div >
        );
    };
    optionObj.methods = {
        changeById: function (id, item) {
            for (var i = 0; i < this.data.length; i++) {
                if (this.data[i].id == id) {
                    this.data[i] = item;
                }
            }
        },
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

        Gx.base.addGetSetFun(obj, "children", function () {
            var buttons = [];
            obj.root.$children.map(function (item) {
                buttons.push(Gx.ui.convertButton(item));
            });
            return buttons;
        }, null);
        return obj;
    };
})(window);