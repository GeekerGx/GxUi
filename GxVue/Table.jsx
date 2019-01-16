/// <reference path="../Lib/Jquery/jquery-3.0.0.min.js" />
/// <reference path="../Script/Gx.Base.js" />
/// <reference path="../Lib/Vue/vue2.5.16.js" />
/// <reference path="../Lib/Bootstrap/Table/bootstrap-table.js" />
/// <reference path="VueBase.js" />

(function (win) {
    var optionObj = {};

    var checkUniqueId = function () {
        if (!this.uniqueId) {
            console.warn("请先设置uniqueId属性");
            return false;
        }
        return true;
    };
    optionObj.mounted = function () {
        this.toolbar = Gx.ui.createToolbar({ data: this.toolbars });
        this.toolbar.appendChildTo(this.$refs.toolbar);
        $(this.$refs.table).bootstrapTable(this._tableSetting);
    };
    optionObj.watch = {
        data: {
            handler: function (newVal, oldVal) {
                this.baseCall("load", newVal);
            },
            immediate: true
        }
    };
    optionObj.render = function (h) {
        var that = this;
        //toobar的id
        var toolbarId = "toolbar_" + Gx.base.getGuid(8, 16);
        var tableSetting = Gx.base.createObject(this._props);
        tableSetting.columns = [];
        this.columns.map(function (item) {
            var newColSetting = Gx.base.mergeParam({
                checkbox: false,//复选框
                field: "",
                title: "",
                titleTooltip: "",
                halign: "center",
                align: "center",
                width: 200,
                visible: true,
                formatter: function (value, row, index) { return value; },
            }, item);
            if (!item.checkbox) {
                newColSetting.formatter = function (value, row, index) {
                    if (!value) { value = that.undefinedText; }
                    if (item.formatter) {
                        return item.formatter(value, row, index);
                    } else {
                        return value;
                    }
                };
            }
            tableSetting.columns.push(newColSetting);
        });
        tableSetting.toolbar = "#" + toolbarId;
        this._tableSetting = tableSetting;
        return (
            <div
                style={{
                    display: this.display ? "" : "none"
                }}
            >
                <div
                    id={toolbarId}
                    ref="toolbar"
                ></div>
                <table ref="table"></table>
            </div>
        );
    };
    optionObj.methods = {
        loadData: function (data) {
            if (!Gx.base.isArray(data)) {
                console.warn("绑定数据不是数组！");
                return;
            }
            this.data = data;
        },
        baseCall: function (method, parameter) {
            return $(this.$refs.table).bootstrapTable(method, parameter);
        },
        getOptions: function () {
            return this.baseCall("getOptions");
        },
        getSelections: function () {
            return this.baseCall("getSelections");
        },
        getData: function (useCurrentPage) {
            return this.baseCall("getData", useCurrentPage);
        },
        remove: function (field, values) {
            this.baseCall("remove", {
                //字段
                field: field,
                //单个值或数组
                values: values
            });
        },
        removeByUniqueId: function (id) {
            if (!checkUniqueId.call(this)) { return; }
            this.baseCall("removeByUniqueId", id);
        },
        getRowByUniqueId: function (id) {
            if (!checkUniqueId.call(this)) { return; }
            return this.baseCall("getRowByUniqueId", id);
        },
        selectPage: function (page) {
            this.baseCall("selectPage", page);
        },
        prevPage: function () {
            this.baseCall("prevPage");
        },
        nextPage: function () {
            this.baseCall("nextPage");
        },
    };
    optionObj.data = function () {
        var data = Gx.base.createObject(this.options);
        return {
            _tableSetting: {},
            //主键列，用于定位和删除
            uniqueId: Gx.base.getDefault(data.uniqueId, undefined),
            //定义表格的高度
            height: Gx.base.getDefault(data.height, undefined),
            //数据为undefined时显示字符串
            undefinedText: Gx.base.getDefault(data.undefinedText, "-"),
            //隔行变色效果
            striped: Gx.base.getDefault(data.striped, true),
            //列设置
            columns: Gx.base.getDefault(data.columns, []),
            //数据
            data: Gx.base.getDefault(data.data, []),
            //分页
            pagination: Gx.base.getDefault(data.pagination, true),
            //循环分页
            paginationLoop: Gx.base.getDefault(data.paginationLoop, false),
            //只显示总数据数，而不显示分页按钮
            onlyInfoPagination: Gx.base.getDefault(data.onlyInfoPagination, false),
            //可选值为 'client' 或者 'server'
            sidePagination: Gx.base.getDefault(data.sidePagination, "client"),
            //页码
            pageNumber: Gx.base.getDefault(data.pageNumber, 1),
            //每页数据条数
            pageSize: Gx.base.getDefault(data.pageSize, 10),
            //每页数据条数下拉
            pageList: Gx.base.getDefault(data.pageList, [10, 50, 100]),
            //判断显示分页信息和 card 视图
            smartDisplay: Gx.base.getDefault(data.smartDisplay, false),
            //搜索框
            search: Gx.base.getDefault(data.search, false),
            //内容列下拉框
            showColumns: Gx.base.getDefault(data.showColumns, false),
            //显示分页按钮
            showPaginationSwitch: Gx.base.getDefault(data.showPaginationSwitch, false),
            //最小隐藏列的数量
            minimumCountColumns: Gx.base.getDefault(data.minimumCountColumns, 2),
            //点击行时，自动选择 rediobox 和 checkbox
            clickToSelect: Gx.base.getDefault(data.clickToSelect, true),
            //单选
            singleSelect: Gx.base.getDefault(data.singleSelect, false),
            //封装的toolbar
            toolbars: Gx.base.getDefault(data.toolbars, []),
            //buttonsToolbar位置，jq选择器
            buttonsToolbar: Gx.base.getDefault(data.buttonsToolbar, undefined),
            //单击行
            onClickRow: Gx.base.getDefault(data.onClickRow, function (row, $el) { }),
            //双击行
            onDblClickRow: Gx.base.getDefault(data.onDblClickRow, function (row, $el) { }),
        };
    };

    var Default = Vue.extend(Gx.ui.getResultObj(optionObj));
    Gx.ui.coms.Table = Default;
    Gx.ui.createTable = function (options) {
        return Gx.ui.createInstance(Default, options);
    };
})(window)