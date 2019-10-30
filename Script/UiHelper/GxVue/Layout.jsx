
(function (win) {
    var optionObj = {};
    var setting = [
        { field: "align", value: "column" },//column、row
        { field: "data", value: [] },
    ];

    //标签面板
    var getLayoutPanel = function (h, item, index) {
        var that = this;
        var props = {
            options: {
                id: item.id,
                childNodes: item.childNodes,
                parentType: "gx-layout",
                layoutIsMain: item.isMain || false
            }
        };
        return (<gx-panel {...{ props }} />);
    };

    optionObj.render = function (h) {
        var that = this;
        if (!this.display) {
            return;
        }
        return (
            <div class={[
                "gx-layout",
                "flex-" + this.align
            ]}>
                {this.data.map(function () { return getLayoutPanel.apply(that, [h, ...arguments]); })}
            </div>
        );
    };

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj, setting));
    Gx.ui.coms.Layout = Default;
    Gx.ui.createLayout = function (options) {

        options.data.map(function (item) {
            item.childNodes = [];
            var childNodes = document.getElementById(item.id).childNodes;
            for (var i = 0; i < childNodes.length; i++) {
                if (childNodes[i].parentNode == document.getElementById(item.id)) {
                    item.childNodes.push(childNodes[i]);
                }
            }
        });
        var obj = this.createInstance(Default, options, setting);
        return this.convertLayout(obj);
    };
    Gx.ui.convertLayout = function (vueCom) {
        return this.vmProxy({
            get root() {
                return vueCom;
            },
        }, setting);
    };
})(window);