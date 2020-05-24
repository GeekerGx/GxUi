import moment from 'moment';
const unitArr = ["years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"];

export const getTimeDiff = (time1, time2) => {
    time1 = moment(time1);
    time2 = moment(time2);
    const msgArr = ["年前", "月前", "周前", "天前", "小时前", "分钟前", "秒前", "毫秒前", "未来"];
    let timeStamp = msgArr[msgArr.length - 1];
    unitArr.some((item, index) => {
        if (time1.diff(moment(time2), item, true) > 1) {
            timeStamp = time1.diff(moment(time2), item) + msgArr[index];
            return true;
        }
        return false;
    });
    return timeStamp;
};

export const getTimeAgo = (time) => {
    return getTimeDiff(moment(), time);
};