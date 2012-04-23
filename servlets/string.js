module.exports = function (string) {
    return function (req, resp) {
        resp.end(string);
    }
};