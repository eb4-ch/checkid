'use strict';
var awsController = require('./awscontroller.js')
module.exports = function(app, options) {
    app.post('/upload', options.array("uploads[]", 12), function(req, res) {
        //console.log('files', req.files);
        awsController.f(req,res);
        // res.send(req.files);
    });
}