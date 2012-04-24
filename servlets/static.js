var fs = require('fs');
var mimes = require('../mimes');

module.exports = function (fspath) {
    return function (req, resp) {
        var paths = [fspath];
        for (var i = 0; i < req.path.length; i++) {
            if (req.path[i][0] == '.') { //not strictly correct, but arguable.
                console.log("Tried to read path starting with '.'");
                return resp.sendError(404);
            }
            paths.push(req.path[i]);
        }
        console.log(paths.join('/'));
        fs.readFile(paths.join('/'), function (err, data) {
            if (err) {
                console.log(err);
                resp.sendError(404);
            } else {
                var filename = req.path[req.path.length - 1];
                var offset = filename.lastIndexOf('.');
                var mime;
                if (offset < 0) {
                    mime = 'application/octet-stream';
                } else {
                    mime = mimes[filename.slice(offset + 1)] || 'application/octet-stream';
                }
                resp.setHeader('content-type', mime);
                resp.end(data);
            }
        });
    }
};