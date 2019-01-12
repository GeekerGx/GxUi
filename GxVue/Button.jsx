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
                <slot name="text"></slot>
            </button>
        );
    };
    optionObj.methods = {
        _baseClick: function () {
            //自定义click事件
            this.click();
        }
    };
    optionObj.props = {
        id: {
            "default": ""
        },
        value: {
            "default": "Button"
        },
        click: {
            "default": function () {
                return function () { };
            }
        },
        enabled: {
            "default": true
        }
    };

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj));
    Gx.ui.coms.Button = Default;
    Gx.ui.createButton = function () {
        return Gx.ui.createInstance(Default, Gx.param.getSerializeParam(arguments));
    };
})(window)