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
                addYear: function (num) {
                    this.year = parseInt(this.year) + num;
                },
                addMonth: function (num) {
                    this.month = parseInt(this.month) + num;
                },
                addDay: function (num) {
                    this.day = parseInt(this.day) + num;
                },
                addHours: function (num) {
                    this.hours = parseInt(this.hours) + num;
                },
                addMinutes: function (num) {
                    this.minutes = parseInt(this.minutes) + num;
                },
                addSeconds: function (num) {
                    this.seconds = parseInt(this.seconds) + num;
                },
                //计算时间间隔
                interval: function (date) {
                    return {
                        timeStamp: this._root.getTime() - Gx.dateTime.date(date)._root.getTime(),
                        getSeconds: function () {
                            return this.timeStamp / 1000;
                        },
                        getMinutes: function () {
                            return this.getSeconds() / 60;
                        },
                        getHours: function () {
                            return this.getMinutes() / 60;
                        },
                        getDay: function () {
                            return this.getHours() / 24;
                        },
                        getMonth: function () {
                            return this.getDay() / 30;
                        },
                        getYear: function () {
                            return this.getMonth() / 12;
                        },
                    };
                },
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
    //dateTime.

    Gx.dateTime = dateTime;
})(window);