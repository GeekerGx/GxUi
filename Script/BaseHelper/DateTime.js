//dateTime帮助类
(function (win) {
    var dateTime = {
        get now() {
            var dateTime = new Date();
            return {
                root: dateTime,
                year: Gx.convert.prefixInteger(dateTime.getFullYear(), 4),
                month: Gx.convert.prefixInteger(dateTime.getMonth() + 1, 2),
                day: Gx.convert.prefixInteger(dateTime.getDate(), 2),
                hours: Gx.convert.prefixInteger(dateTime.getHours(), 2),
                minutes: Gx.convert.prefixInteger(dateTime.getMinutes(), 2),
                seconds: Gx.convert.prefixInteger(dateTime.getSeconds(), 2),
            };
        }
    };

    dateTime.getDate = function () {
        var now = this.now;
        return now.year + "-" + now.month + "-" + now.day;
    };
    dateTime.getTime = function () {
        var now = this.now;
        return now.hours + ":" + now.minutes + ":" + now.seconds;
    }
    dateTime.getDateTime = function () {
        return this.getDate() + " " + this.getTime();
    }

    Gx.dateTime = dateTime;
})(window);