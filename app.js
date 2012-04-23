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
    var r = routes[path || ''] || resp.errors[404];
    if (typeof r == 'function') {
        r(req, resp);
    } else {
        route(req, resp, r);
    }
}

server = http.createServer(function (req, resp) {
    resp.errors = errors;
    var url = parseurl(req.url);
    req.path = url.pathname.split('/').slice(1);
    req.parameters = parsequerystring(url.query);
    console.log(req.url);
    route(req, resp, routes);
});
server.listen(8000);




