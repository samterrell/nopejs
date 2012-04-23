var https = require("https");

var host = 'api.twitter.com';

//module.exports is what is returned from require()
module.exports = function (req, resp) {
    req.path.unshift('');
    https.get({'host':host, 'path':req.path.join('/')},
        function (result) {
            resp.setHeader('content-type',result.headers['content-type']);
            result.on('data', function (data) {
                resp.write(data);
            });
            result.on('end', function (data) {
                resp.end(data);
            });
        }).on('error', function (error) {
            console.log(error);
            resp.errors[500](req,resp);
        });
};
