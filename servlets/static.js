var fs = require('fs');
var mimes = require('../mimes');

module.exports = function (fspath, options) {
    if (typeof options == undefined) options = {};
    return function (req, resp) {
        if (req.method == "GET") {
            GET(req, resp);
        } else {
            resp.sendError(405, ["GET"]);
        }
    };
    function GET(req, resp) {
        var paths = [fspath];
        for (var i = 0; i < req.path.length; i++) {
            if (req.path[i][0] == '.') { //not strictly correct, but arguable.
                console.log("Tried to read path starting with '.'");
                resp.sendError(404);
                return;
            }
            paths.push(req.path[i]);
        }
        var fullpath = paths.join('/');
        fs.stat(fullpath, function (err, stat) {
            if (err) {
                return resp.sendError(404);
            }
            var headers = {
                'date':new Date().toGMTString()
            };
            if (typeof options['cache-control'] != undefined) {
                headers['cache-control'] = options['cache-control'];
            }
            if (typeof options['expires'] != undefined) {
                headers['expires'] = new Date(new Date().getTime() + options['expires'] * 1000).toGMTString();
            }

            if (req.headers['if-modified-since']) {
                var modDate = Date.parse(req.headers['if-modified-since']);
                if (stat.mtime <= modDate) {
                    headers['content-length'] = 0;
                    resp.writeHead('304', 'Not Modified', headers);
                    resp.end();
                    return;
                }
            }
            var stream = fs.createReadStream(paths.join('/'));
            stream.on('error', function () {
                resp.sendError(404);
            });
            var filename = req.path[req.path.length - 1];
            var offset = filename.lastIndexOf('.');
            var mime;
            if (offset < 0) {
                mime = 'application/octet-stream';
            } else {
                mime = mimes[filename.slice(offset + 1)] || 'application/octet-stream';
            }
            headers['content-type'] = mime;
            headers['last-modified'] = stat.mtime.toGMTString();
            headers['content-length'] = stat.size;
            resp.writeHead(200, 'OK', headers);
            stream.pipe(resp);
        });
    }
};