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
                    onClick={this.baseClick}
                >
                    {this.value}
                </button>
            );
        },
        //��������
        computed: {
        },
        //��������
        watch: {
        },
        //����
        methods: {
            baseClick: function () {
                //�Զ���click����
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