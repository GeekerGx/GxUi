

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
                    class="tab-content"
                >
                    {this.data.map(function (item, index) {
                        var props = {
                            options: {
                                id: item.id,
                                active: index == that.selectIndex
                            }
                        };
                        return (
                            <gx-panel
                                {...{ props }}
                                domPropsInnerHTML={item.el}
                            >
                            </gx-panel>
                        );
                    })}
                </div>
            </div>
        );
    };

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj, setting));
    Gx.ui.coms.Tabs = Default;
    Gx.ui.createTabs = function (options) {
        options.data.map(function (item) {
            item["el"] = document.getElementById(item.id).innerHTML;
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