//dateTime帮助类
(function (win) {
    var dateTime = {
        date: function (date) {
            if (!Gx.base.isDate(date)) {
                //如果date参数不为Date类型 则需要转换成该类型。
                date = new Date(date);
            }

            return {
                _root: date,
                get year() {
                    return Gx.convert.prefixInteger(this._root.getFullYear(), 4);
                },
                set year(val) {
                    this._root.setFullYear(val);
                },
                get month() {
                    return Gx.convert.prefixInteger(this._root.getMonth() + 1, 2);
                },
                set month(val) {
                    this._root.setMonth(val - 1);
                },
                get day() {
                    return Gx.convert.prefixInteger(this._root.getDate(), 2);
                },
                set day(val) {
                    this._root.setDate(val);
                },
                get hours() {
                    return Gx.convert.prefixInteger(this._root.getHours(), 2);
                },
                set hours(val) {
                    this._root.setHours(val);
                },
                get minutes() {
                    return Gx.convert.prefixInteger(this._root.getMinutes(), 2);
                },
                set minutes(val) {
                    this._root.setMinutes(val);
                },
                get seconds() {
                    return Gx.convert.prefixInteger(this._root.getSeconds(), 2);
                },
                set seconds(val) {
                    this._root.setSeconds(val);
                },
                getDate: dateTime.getDate,
                getTime: dateTime.getTime,
                getDateTime: dateTime.getDateTime,
            };
        },
        get now() {
            return new this.date(new Date());
        }
    };

    dateTime.getDate = function () {
        var that = this.now || this;
        return that.year + "-" + that.month + "-" + that.day;
    };
    dateTime.getTime = function () {
        var that = this.now || this;
        return that.hours + ":" + that.minutes + ":" + that.seconds;
    };
    dateTime.getDateTime = function () {
        return this.getDate() + " " + this.getTime();
    };

    Gx.dateTime = dateTime;
})(window);