(function (win) {
    var optionObj = {};
    var setting = [
        //控件id用来当做父组件的属性
        { field: "id", value: "" },
        //按钮显示值
        { field: "value", value: "Button" },
        //点击事件
        { field: "onClick", value: function () { } },
        //启用
        { field: "enabled", value: true },
    ];
    optionObj.render = function (h) {
        if (!this.display) return;

        return (
            <button
                class={["btn", "btn-default"]}
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
            this.onClick();
        }
    };
    optionObj.computed = {
        root: function () {
            return Gx.ui.convertButton(this);
        }
    };

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj, setting));
    Gx.ui.coms.Button = Default;
    Gx.ui.createButton = function (options) {
        var vueCom = this.createInstance(Default, options);
        return this.convertButton(vueCom);
    };
    Gx.ui.convertButton = function (vueCom) {
        return this.vmProxy({
            get root() {
                return vueCom;
            },
        }, setting);
    };
})(window)