const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/common', { target: 'http://localhost:8888' }));
    app.use(proxy('/orange', { target: 'http://localhost:8888' }));
    //app.listen(3000);
};