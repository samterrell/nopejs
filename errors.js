module.exports = {
    404:function (req, resp, msg) {
        resp.writeHead(404, "Not Found");
        resp.end(msg || "404: Not Found");
    },
    500:function (req, resp, msg) {
        resp.writeHead(500, "Internal Server Error");
        resp.end(msg || "500: Internal Server Error");
    }
};