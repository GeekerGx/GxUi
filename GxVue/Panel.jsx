/// <reference path="../Lib/Jquery/jquery-3.0.0.min.js" />
/// <reference path="../Script/Gx.Base.js" />
/// <reference path="../Lib/Vue/vue2.5.16.js" />
/// <reference path="VueBase.js" />

(function (win) {
    var optionObj = {};

    optionObj.render = function (h) {
        var props = {
            value: "123"
        };
        return (
            <div
                style={{
                    display: this.display ? "" : "none"
                }}
            >
                这里是pane
                <gx-button {...{ props }} >
                    <text>这里是slot</text>
                </gx-button>
            </div>
        );
    };

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj));
    Gx.ui.coms.Panel = Default;
    Gx.ui.createPanel = function () {
        return Gx.ui.createInstance(Default, Gx.param.getSerializeParam(arguments));
    };
})(window);