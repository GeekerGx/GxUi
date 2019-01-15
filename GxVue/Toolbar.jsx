/// <reference path="../Lib/Jquery/jquery-3.0.0.min.js" />
/// <reference path="../Script/Gx.Base.js" />
/// <reference path="../Lib/Vue/vue2.5.16.js" />
/// <reference path="VueBase.js" />

/**
 * 
 *  目前只能一次性创建按钮，无法动态添加。
 * 
*/

(function (win) {
    var optionObj = {};

    optionObj.render = function (h) {
        var that = this;
        var buttons = [];
        this.data.map(function (item) {
            if (Gx.ui.checkSysKeepKey(item.id)) {
                item.id = item.id + "" + Gx.base.getGuid(8, 16);
            }
            item.id = item.id || Gx.base.getGuid(8, 16);

            var props = Gx.base.createObject(item);
            buttons.push(<gx-button {...{ props }}
                on-changeById={that.changeById}
                ref={props.id}
            />);
        });

        return (
            <div
                style={{
                    display: this.display ? "" : "none"
                }}
            >
                {buttons}
            </div >
        );
    };
    optionObj.props = {
        data: {
            "default": function () {
                return [];
            }
        },
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
    var Default = Vue.extend(Gx.ui.getResultObj(optionObj));
    Gx.ui.coms.Toolbar = Default;
    Gx.ui.createToolbar = function () {
        return Gx.ui.createInstance(Default, Gx.param.getSerializeParam(arguments));
    };
})(window);