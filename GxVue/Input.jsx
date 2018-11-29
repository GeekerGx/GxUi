/// <reference path="../Lib/Jquery/jquery-3.0.0.min.js" />
/// <reference path="../Script/Gx.Base.js" />
/// <reference path="../Lib/Vue/vue2.5.16.js" />
(function (win) {
    var Default = Vue.extend({
        render: function (h) {
            if(this.type=='textarea'){
                return (
                    <textarea
                        placeholder={this.placeholder}
                        onChange={this.baseChange}
                    />
                );
            }else{
                return (
                    <input
                        type={this.type}
                        placeholder={this.placeholder}
                        onChange={this.baseChange}
                    />
                );
            }
        },
        //��������
        computed: {
            value: {
                cache: false,
                get: function () {
                    var obj = this.$el;
                    return obj.value;
                },
                set: function (val) {
                    var obj = this.$el;
                    obj.value = val;
                }
            }
        },
        //��������
        watch: {
        },
        //����
        methods: {
            baseChange: function () {                
                //��֤
                if(this.validation(this.value)){
                    //�Զ���change����
                    this.change();
                }
            }
        },
        data: function () {
            return {
            };
        },
        props: {
            type: {
                "default": "text"
            },
            placeholder: "",
            //������ʽ������֤����
            validation: {
                "default": function () {
                    return function (value) {
                        return true;
                    };
                }
            },
            //change�¼�
            change: {
                "default": function () {
                    return function () {
                    };
                }
            }
        }
    });
        
    Gx.ui.coms.Input = Default;

    Gx.ui.createInput = function () {

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