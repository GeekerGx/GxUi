/// <reference path="../Lib/Jquery/jquery-3.0.0.min.js" />
/// <reference path="../Script/Gx.Base.js" />
/// <reference path="../Lib/Vue/vue2.5.16.js" />

(function (win) {

    var Default = Vue.extend({
        render: function (h) {
            return (
                <button
                    type="button"
                    disabled={!this.enabled}
                    onClick={this._baseClick}
                >
                    {this.value}
                </button>
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
            _baseClick: function () {
                //自定义click事件
                this.click();
            }
        },
        data: function () {
            return {
            };
        },
        props: {
            value: {
                "default": "Button"
            },
            click: {
                "default": function () {
                    return function () { };
                }
            },
            enabled: {
                "default": true
            }
        }
    });

    Gx.ui.coms.Button = Default;

    Gx.ui.createButton = function () {

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

})(window)