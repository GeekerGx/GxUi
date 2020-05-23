const path = require('path');
module.exports = (url) => {
    const pathReact = path.join(__dirname, '../..', url);
    return pathReact;
};