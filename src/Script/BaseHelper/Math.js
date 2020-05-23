//所有的方法集成在Gx下
(function () {
    Gx.math = {
        numToCN: function (num) {
            return numto({
                num: num,
                lvNum: 10000,
                sizes: ["", "万", "亿", "兆", "京"]
            });
        },
        numToB: function (num) {
            return numto({
                num: num,
                lvNum: 1000,
                sizes: ["", "K", "M", "G", "T", "P", "E"]
            });
        },
        numToC: function (num) {
            return numto({
                num: num,
                lvNum: 1024,
                sizes: ["B", "KB", "MB", "GB", "TB", "PB", "EB"]
            });
        },
    };
    var numto = function (obj) {
        var num = obj.num;
        var lvNum = obj.lvNum;
        var sizes = obj.sizes;

        if (!num) {
            return "0" + sizes[0];
        }
        var flag = num > 0;
        if (!flag) {
            num = Math.abs(num);
        }

        var lv = Math.floor(Math.log(num) / Math.log(lvNum));
        if (lv > sizes.length - 1) {
            lv = sizes.length - 1;
        }
        return (flag ? "" : "-") + (num / Math.pow(lvNum, lv)) + "" + sizes[lv];
    };
})();