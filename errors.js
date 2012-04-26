module.exports = {
    404:function (req, resp, msg) {
        resp.setHeader("content-type", "text/plain");
        resp.writeHead(404, "Not Found");
        if (req.method == 'GET') {
            resp.end(msg || "404: Not Found");
        } else {
            resp.end();
        }
    },
    405:function (req, resp, methods, msg) {
        resp.writeHead(405, "Method Not Allowed", {
            'allow':methods.join(', ')
        });
        resp.end(msg || "405: Method " + req.method + " is not allowed.");
    },
    500:function (req, resp, msg) {
        resp.setHeader("content-type", "text/plain");
        resp.writeHead(500, "Internal Server Error");
        if (req.method == 'GET') {
            resp.end(msg || "500: Internal Server Error");
        } else {
            resp.end();
        }
    }
};