
/**
 * 
 *  目前只能一次性创建按钮，无法动态添加。
 * 
*/

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
    optionObj.watch = {
        /*"$refs": {
            handler: function (val,oldVal) {
                console.log(val);
                var that = this;
                val.map(function (item) {
                    that[item.id] = item;
                });
            },
            deep: true,
            immediate: true
        }*/
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
        return Gx.ui.createInstance(Default, options, setting);
    };
})(window);