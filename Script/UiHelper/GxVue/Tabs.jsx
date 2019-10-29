

(function (win) {
    var optionObj = {};
    var setting = [
        { field: "data", value: [] },
        { field: "selectIndex", value: 0 }
    ];
    //标签头部
    var getTabHead = function (h, item, index) {
        var that = this;
        var isActive = index == that.selectIndex;
        var isDisabled = item.disabled === true;
        return (
            <li
                class={[
                    isActive ? "active" : null,
                    isDisabled ? "disabled" : null
                ]}
                style={{
                    display: item.display === false ? "none" : null
                }}
            >
                <a
                    class={[
                        isDisabled ? "disabled" : null
                    ]}
                    href={isDisabled ? null : "#" + item.id}
                    data-toggle={isDisabled ? null : "tab"}
                    onClick={function () {
                        that._baseClick(item, index);
                    }}
                >
                    {item.title}
                </a>
            </li>
        );
    };

    //标签面板
    var getTabPanel = function (h, item, index) {
        var that = this;
        var isActive = index == that.selectIndex;
        var props = {
            options: {
                id: item.id,
                childNodes: item.childNodes,
                active: isActive,
                parentType: "gx-tabs",
            }
        };
        return (<gx-panel {...{ props }} />);
    };

    optionObj.render = function (h) {
        var that = this;
        if (!this.display) {
            return;
        }

        return (
            <div ref="tabs" class="gx-tabs">
                <ul class="nav nav-tabs" >
                    {this.data.map(function () { return getTabHead.apply(that, [h, ...arguments]); })}
                </ul>
                <div ref="content" class="tab-content" style="height: calc(100% - 42px);" >
                    {this.data.map(function () { return getTabPanel.apply(that, [h, ...arguments]); })}
                </div>
            </div>
        );
    };
    optionObj.methods = {
        _baseClick: function (item, index) {
            var that = this;
            var isChange = this.selectIndex != index;
            if (item.disabled) {
                return;
            }
            that.selectIndex = index;
            if (isChange && item.onClick) {
                item.onClick(index);
            }
        },
    };

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj, setting));
    Gx.ui.coms.Tabs = Default;
    Gx.ui.createTabs = function (options) {
        options.data.map(function (item) {
            item.childNodes = [];
            var childNodes = document.getElementById(item.id).childNodes;
            for (var i = 0; i < childNodes.length; i++) {
                if (childNodes[i].parentNode == document.getElementById(item.id)) {
                    item.childNodes.push(childNodes[i]);
                }
            }
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