(function (win) {
    var optionObj = {};
    var setting = [
        //控件id用来当做父组件的属性
        { field: "id", value: "" },
        //按钮显示值
        { field: "value", value: "Button" },
        //点击事件
        { field: "click", value: function () { } },
        //启用
        { field: "enabled", value: true },
    ];
    optionObj.watch = {
        _data: {
            handler: function () {
                this.$emit("changeById", this.id, this._data);
            },
            deep: true,
            immediate: true
        },
    };
    optionObj.render = function (h) {
        if (!this.display) return;
        //#region

        //#endregion

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

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj, setting));
    Gx.ui.coms.Button = Default;
    Gx.ui.createButton = function (options) {
        return this.createInstance(Default, options, setting);
    };
})(window)