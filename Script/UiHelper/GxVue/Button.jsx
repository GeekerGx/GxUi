(function (win) {
    var optionObj = {};
    var setting = [
        //控件id用来当做父组件的属性
        { field: "id", value: "" },
        //按钮显示值
        { field: "text", value: "Button" },
        //点击事件
        { field: "onClick", value: function () { } },
        //宽度，覆盖公共,为空则自适应内容长度
        { field: "width", value: null },
        //todo 图标
        //todo 背景颜色
        //todo 大小
    ];
    optionObj.render = function (h) {
        if (!this.display) return;

        return (
            <button
                class={["btn", "btn-default"]}
                type="button"
                disabled={!this.enabled}
                onClick={this._baseClick}
                style={{
                    width: this.width
                }}
            >
                {this.text}
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