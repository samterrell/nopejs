module.exports = function (protocol, server, path) {
    return function (req, resp) {
        req.path.unshift(path || '');
        protocol.get({'host':server, 'path':req.path.join('/')},
            function (result) {
                resp.setHeader('content-type', result.headers['content-type']);
                result.on('data', function (data) {
                    resp.write(data);
                });
                result.on('end', function (data) {
                    resp.end(data);
                });
            }).on('error', function (error) {
                console.log(error);
                resp.sendError(500);
            });
    }
};
