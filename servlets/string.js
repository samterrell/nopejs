module.exports = function (string) {
    return function (req, resp) {
        resp.setHeader("content-type","text/plain");
        resp.end(string);
    }
};