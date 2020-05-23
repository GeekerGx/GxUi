//转换帮助类
(function () {
    var convert = {
        objToJson: function (obj) {
            return JSON.stringify(obj);
        },
        jsonToObj: function (json) {
            return JSON.parse(json);
        },
        toNumber: function (num, isMicrometer, precision) {
            //去杂质
            num = parseFloat(num).toString();

            //精确度转换
            if (precision) {

            }

            //千分位转换
            if (isMicrometer) {
                num = (function (n) {
                    n += '';
                    if (!n.includes('.')) n += '.';
                    return n.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
                        return $1 + ',';
                    }).replace(/\.$/, '');
                })(num);
            }
            return num
        },
        //数字 向前0补齐
        prefixInteger: function (num, length) {
            return (Array(length).join('0') + num).slice(-length);
        }
    };
    Gx.convert = convert;
}());