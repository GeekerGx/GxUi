const gx = {
    test: 12345
};
const add = {
    add: (a, b) => {
        return a + b;
    }
}
export default {
    ...gx,
    ...add,
};