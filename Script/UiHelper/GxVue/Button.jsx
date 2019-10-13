(function (win) {
    var optionObj = {};
    var setting = [
        //控件id用来当做父组件的属性
        { field: "id", value: null },
        //按钮显示值
        { field: "text", value: "Button" },
        //宽度，覆盖公共,为空则自适应内容长度
        { field: "width", value: null },
        // 图标
        { field: "icon", value: null },
        //todo 背景颜色
        // 大小
        { field: "size", value: null },
        //点击事件
        { field: "onClick", value: function () { } },
    ];
    optionObj.render = function (h) {
        var that = this;
        if (!this.display) return;
        var sizeClass = (function () {
            switch (that.size) {
                case "lg":
                    return "btn-lg";
                case "sm":
                    return "btn-sm";
                case "xs":
                    return "btn-xs";
            }
        })()

        return (
            <button
                id={this.id || this.options.el}
                class={["btn", "btn-default", sizeClass]}
                type="button"
                disabled={!this.enabled}
                onClick={this._baseClick}
                style={{
                    width: this.width
                }}
            >
                {(function () {
                    if (that.icon) {
                        return (<i class={"glyphicon glyphicon-" + that.icon} ></i>);
                    }
                })()}
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