/// <reference path="../Lib/Jquery/jquery-3.0.0.min.js" />
/// <reference path="../Script/Gx.Base.js" />
/// <reference path="../Lib/Vue/vue2.5.16.js" />
/// <reference path="VueBase.js" />

(function (win) {
    var optionObj = {};

    optionObj.render = function (h) {
        if (!this.display) {
            return;
        }
        return (
            <button
                class={["btn", "navbar-btn", "btn-default"]}
                type="button"
                disabled={!this.enabled}
                onClick={this._baseClick}
            >
                {this.value}
            </button>
        );
    };
    optionObj.methods = {
        _baseClick: function () {
            //自定义click事件
            this.click();
        }
    };
    optionObj.watch = {
        _props: {
            handler: function () {
                this.$emit("changeById", this.id, this._props);
            },
            deep: true
        },
    };
    optionObj.data = function () {
        var data = Gx.base.createObject(this.options);
        return {
            id: data.id || "",
            value: data.value || "Button",
            click: data.click || function () { },
            enabled: data.enabled || true
        }
    };

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj));
    Gx.ui.coms.Button = Default;
    Gx.ui.createButton = function (options) {
        return Gx.ui.createInstance(Default, options);
    };
})(window)