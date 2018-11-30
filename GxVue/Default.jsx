/// <reference path="../Lib/Jquery/jquery-3.0.0.min.js" />
/// <reference path="../Script/Gx.Base.js" />
/// <reference path="../Lib/Vue/vue2.5.16.js" />

(function (win) {
    
    var Default = Vue.extend({
        render: function (h) {
            return (
                <div>{this.value}</div>
            );
        },
        //计算属性
        computed: {
        },
        //侦听属性
        watch: {
        },
        //方法
        methods: {
        },
        data: function () {
            return {
            };
        },
        beforeCreate: function () {
        },
        created: function () {
        },
        beforeMount: function () {
        },
        mounted: function () {
        },
        props: {
            value: {
                "default": "default"
            }
        }
    });

    Gx.ui.coms.Default = Default;

    Gx.ui.createDefault = function () {

        var paramObj = Gx.param.getSerializeParam(arguments);

        var option = new Default({ propsData: paramObj.obj[0] });
        if (paramObj.str[0]) {
            option = option.$mount("#" + paramObj.str[0]);
        }
        else {
            option = option.$mount();
        }

        return option;
    };
})(window);