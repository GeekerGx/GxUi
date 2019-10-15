

(function (win) {
    var optionObj = {};
    var setting = [
        { field: "id", value: "panel_" + Gx.base.getGuid(8, 16) },
        { field: "active", value: true },
        { field: "childNodes", value: [] },
        { field: "title", value: null },
        { field: "foot", value: null },
        { field: "isTabs", value: false },
        //todo 工具栏
        { field: "toolbar", value: null },
    ];

    var createPanelHead = function (h, that) {
        if (!that.title && !that.toolbar) {
            return null;
        }
        return (
            <div class="panel-heading">
                <div class="panel-title">
                    {that.title || ""}
                </div>
                {(function () {
                    if (that.toolbar) {

                        var props = {
                            options: {
                                data: Gx.base.createObject(that.toolbar)
                            }
                        };
                        return (
                            <div class="panel-toolbar">
                                <gx-toolbar {...{ props }}></gx-toolbar>
                            </div>
                        );
                    }
                })()}
            </div>
        );
    };
    var createPanelFoot = function (h, that) {
        if (!that.foot) {
            return null;
        }
        return (
            <div class="panel-footer">
                {that.foot}
            </div>
        );
    };
    optionObj.render = function (h) {
        var that = this;
        return (
            <div
                id={this.id}
                class={[
                    //panel
                    this.isTabs ? "" : "panel",
                    this.isTabs ? "" : "panel-default",

                    //tabs
                    this.isTabs ? "tab-pane" : "",
                    this.isTabs ? "fade" : "",

                    this.active ? "flex-main" : "",
                    this.active ? "active" : "",
                    this.active ? "in" : "",
                ]}
            >
                {createPanelHead(h, that)}
                <div
                    class={[
                        this.isTabs ? "" : "panel-body"
                    ]}
                    ref="content"
                >
                </div>
                {createPanelFoot(h, that)}
            </div>
        );
    };
    optionObj.mounted = function () {
        var that = this;
        if (!this.display || !that.$refs.content) {
            return;
        }
        //将暂存的内容放置到容器内
        that.childNodes.map(function (node) {
            that.$refs.content.append(node);
        });
    };
    optionObj.watch = {
        //监听传参过来的active
        "options.active": function (val, oldVal) {
            this.active = val;
        }
    };

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj, setting));
    Gx.ui.coms.Panel = Default;
    Gx.ui.createPanel = function (options) {
        options.childNodes = [];
        var childNodes = document.getElementById(options.el).childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            if (childNodes[i].parentNode == document.getElementById(options.el)) {
                options.childNodes.push(childNodes[i]);
            }
        }

        var vueCom = this.createInstance(Default, options);
        return this.convertPanel(vueCom);
    };
    Gx.ui.convertPanel = function (vueCom) {
        return this.vmProxy({
            get root() {
                return vueCom;
            },
        }, setting);
    };
})(window);