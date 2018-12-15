/// <reference path="../Lib/Jquery/jquery-3.0.0.min.js" />
/// <reference path="../Script/Gx.Base.js" />
/// <reference path="../Lib/Vue/vue2.5.16.js" />
/// <reference path="../Lib/Bootstrap/Table/bootstrap-table.js" />

(function (win) {
    var _tabSetting = function () {
        return {
            undefinedText: '-',//数据为空时显示字符串
            striped: true,//隔行变色效果
            columns:[],//列设置
            data:[],//数据
            pagination:true,//分页
            paginationLoop:false,//循环分页
            pageNumber:1,//页码
            pageSize:10,//每页数据条数
            pageList:[10,50,100],//每页数据条数下拉
            smartDisplay:false,//判断显示分页信息和 card 视图
            search:false,//搜索框
            showPaginationSwitch:true,//切换分页按钮
            singleSelect:true,//单选
            toolbar:undefined,//toolbar位置，jq选择器
            buttonsToolbar:undefined,//buttonsToolbar位置，jq选择器
        };
    };
    var optionObj = {};
    var Default = Vue.extend(Gx.base.mergeParam(Gx.ui.getDefaultObj(), optionObj));
    Gx.ui.coms.Table = Default;

    Gx.ui.createTable = function () {
        return Gx.ui.createInstance(Default, Gx.param.getSerializeParam(arguments));
    };
})(window)