//UI控件帮助类
(function (win) {
    var ui = {
        //组件库
        coms: {},
        getDefaultObj: function () {
            return {
                //生成元素
                render: function (h) {
                    return (null);
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
                //内置数据
                data: function () {
                    return {
                    };
                },
                //创建前
                beforeCreate: function () {
                },
                //创建后
                created: function () {
                },
                //挂载前
                beforeMount: function () {
                },
                //挂载后
                mounted: function () {
                },
                //传入数据
                props: {
                }
            };
        }
    };
    win.Gx.ui = ui;

})(window);