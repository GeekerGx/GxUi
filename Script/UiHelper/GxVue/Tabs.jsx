

(function (win) {
    var optionObj = {};
    var setting = [
        { field: "data", value: [] },
        { field: "selectIndex", value: 0 }
    ];

    optionObj.render = function (h) {
        var that = this;
        if (!this.display) {
            return;
        }

        return (
            <div
                ref="tabs"
            >
                <ul
                    class="nav nav-tabs"
                >
                    {this.data.map(function (item, index) {
                        return (
                            <li
                                class={[
                                    index == that.selectIndex ? "active" : ""
                                ]}
                            >
                                <a
                                    href={"#" + item.id}
                                    data-toggle="tab"
                                >
                                    {item.title}
                                </a>
                            </li>
                        );
                    })}
                </ul>
                <div
                    ref="content"
                    class="tab-content"
                >
                </div>
            </div>
        );
    };
    optionObj.updated = function () {
        var that = this;
        this.data.map(function (item) {
            console.log(item.el);
            that.$refs.content.append(item.el);
        });
    };

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj, setting));
    Gx.ui.coms.Tabs = Default;
    Gx.ui.createTabs = function (options) {
        options.data.map(function (item) {
            item["el"] = document.getElementById(item.id).cloneNode(true);;
            console.log(item.el);
        });
        var vueCom = this.createInstance(Default, options);
        return this.convertTabs(vueCom);
    };
    Gx.ui.convertTabs = function (vueCom) {
        return this.vmProxy({
            get root() {
                return vueCom;
            },
        }, setting);
    };
})(window);