export const getGuid = (length, radix) => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    radix = radix || chars.length;
    let arr = [];
    if (length) {
        for (let i = 0; i < length; i++) {
            arr[i] = chars[0 | Math.random() * radix];
        }
    } else {
        arr[8] = arr[13] = arr[18] = arr[23] = "-";
        arr[14] = "4";
        for (let i = 0; i < 36; i++) {
            if (arr[i]) {
                continue;
            }
            const c = 0 | Math.random() * 16;
            arr[i] = chars[i == 19 ? (c & 0x3) | 0x8 : c];
        }
    }
    return arr.join("");
};