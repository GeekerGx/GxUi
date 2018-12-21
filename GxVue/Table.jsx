/// <reference path="../Lib/Jquery/jquery-3.0.0.min.js" />
/// <reference path="../Script/Gx.Base.js" />
/// <reference path="../Lib/Vue/vue2.5.16.js" />
/// <reference path="../Lib/Bootstrap/Table/bootstrap-table.js" />

(function (win) {
    var getTabSetting = function () {
        return {
            undefinedText: '-',//数据为空时显示字符串
            striped: true,//隔行变色效果
            columns: [],//列设置
            data: [],//数据
            pagination: true,//分页
            paginationLoop: false,//循环分页
            pageNumber: 1,//页码
            pageSize: 10,//每页数据条数
            pageList: [10, 50, 100],//每页数据条数下拉
            smartDisplay: false,//判断显示分页信息和 card 视图
            search: false,//搜索框
            showPaginationSwitch: false,//显示分页按钮
            singleSelect: true,//单选
            toolbar: undefined,//toolbar位置，jq选择器
            buttonsToolbar: undefined,//buttonsToolbar位置，jq选择器
            onClickRow: function (row, $el) { },//单击行
            onDblClickRow: function (row, $el) { },//双击行
        };
    };
    var getColumnSetting = function () {
        return {
            checkbox: false,//复选框
            field: "",
            title: "",
            titleTooltip: "",
            halign: "center",
            align: "center",
            width: 200,
            visible: true,
            formatter: function (value, row, index) { return value; },
        };
    };

    var optionObj = {};
    optionObj.render = function (h) {
        var tableSetting = getTabSetting();
        this.columns.map(function (item) {
            tableSetting.columns.push(Gx.base.mergeParam(getColumnSetting(), item));
        });
        tableSetting.data = this.data;
        this._setting = tableSetting;
        return (
            <table ref="table"></table>
        );
    };
    optionObj.methods={
        loadData:function(data){
            this.data=data;
        },
        getOptions:function(){
            return this.baseCall("getOptions");
        },
        baseCall:function(method,parameter){
            return $(this.$refs.table).bootstrapTable(method,parameter);
        },
    };
    optionObj.mounted = function () {
        $(this.$refs.table).bootstrapTable(this._setting);
    };
    optionObj.updated = function () {
        this.baseCall("load", this.data);
    };
    optionObj.props = {
        columns: {
            "default": function () {
                return [];
            }
        },
        data: {
            "default": function () {
                return [];
            }
        },
    };
    optionObj.data = function () {
        return {
            _setting: {}
        };
    };


    var Default = Vue.extend(Gx.base.mergeParam(Gx.ui.getDefaultObj(), optionObj));
    Gx.ui.coms.Table = Default;
    Gx.ui.createTable = function () {
        return Gx.ui.createInstance(Default, Gx.param.getSerializeParam(arguments));
    };
})(window)