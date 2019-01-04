/// <reference path="../Lib/Jquery/jquery-3.0.0.min.js" />
/// <reference path="../Script/Gx.Base.js" />
/// <reference path="../Lib/Vue/vue2.5.16.js" />

(function (win) {

    var optionObj = {};
    optionObj.render = function (h) {
        var that = this;
        return (
            <div>
            </div>
        );
    };
    
    optionObj.props = {
    };
    var Default = Vue.extend(Gx.base.mergeParam(Gx.ui.getDefaultObj(), optionObj));

    Gx.ui.coms.Toolbar = Default;

    Gx.ui.createToolbar = function () {
        return Gx.ui.createInstance(Default, Gx.param.getSerializeParam(arguments));
    };
})(window);