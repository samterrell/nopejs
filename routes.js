module.exports = {
    'twitter':require("./servlets/proxy")({protocol:require('https'),server:"api.twitter.com"}),
    '':require("./servlets/string")("Hello World"),
    'test':{
        'sam':require("./servlets/string")("Hello Sam")
    },
    'test2':require("./servlets/string")("Hello whoever"),
    'static':require("./servlets/static")("web")
};