var https = require('https');
var http = require('http');
var proxy = require('./servlets/proxy');
var string = require('./servlets/string');
var static = require('./servlets/static');

module.exports = {
    'twitter':proxy({protocol:https, server:"api.twitter.com"}),
    '':string("Hello World"),
    'test':{
        'sam':string("Hello Sam")
    },
    'test2':string("Hello whoever"),
    'static':static("web")
};