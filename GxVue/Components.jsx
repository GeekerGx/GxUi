/// <reference path="../Lib/Jquery/jquery-3.0.0.min.js" />
/// <reference path="../Script/Gx.Base.js" />
/// <reference path="../Lib/Vue/vue2.5.16.js" />
(function (win) {
    
    var Default = Vue.extend({
        render: function (h) {
            var arr=[];
            this.coms.map(function(item,index){
                arr.push(<li></li>);
            });
            return(
                <ul>
                    {arr}
                </ul>
            );
        },
        mounted:function(){
            var arr= this.$el.getElementsByTagName("li");
            
            this.coms.map(function(item,index){
                arr[index].appendChild(item.$el);
            });
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
        props: {
            coms: {
                "default": function () {
                    return [];
                }
            }
        }
    });
    
    Gx.ui.coms.Components = Default;

    Gx.ui.createComponents = function () {

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