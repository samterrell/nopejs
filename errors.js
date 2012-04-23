module.exports = {
    404:function (req, resp) {
        resp.writeHead(404, "Not Found");
        resp.end("404: Not Found");
    },
    500:function (req, resp, msg) {
        resp.writeHead(500, "Internal Server Error");
        if (typeof msg == 'undefined') {
            resp.end("500: Internal Server Error");
        } else {
            resp.end("500: " + msg);
        }
    }
};