var http = require("http");
var parseurl = require("url").parse;
var parsequerystring = require("querystring").parse;
var routes = require('./routes');
var errors = require('./errors');

/*
 Fun URLs:
 http://localhost:8000/twitter/1/trends/daily.json
 http://localhost:8000/static/test.txt
 */

function route(req, resp, routes) {
    var path = req.path.shift();
    var handler = routes[path || ''];
    if(typeof handler == 'undefined') {
        resp.sendError(404);
    } else if (typeof handler == 'function') {
        handler(req, resp);
    } else {
        route(req, resp, handler);
    }
}

server = http.createServer(function (req, resp) {
    resp.sendError = function(status, msg) {
        (errors[status]||errors[500]||function(req,resp) {
            resp.writeHead(500, "Internal Server Error");
            resp.end("Please fix error mappings.");
        })(req,resp,msg);
    }
    var url = parseurl(req.url);
    req.path = url.pathname.split('/').slice(1);
    req.parameters = parsequerystring(url.query);
    console.log(req.url);
    route(req, resp, routes);
});
server.listen(8000);




