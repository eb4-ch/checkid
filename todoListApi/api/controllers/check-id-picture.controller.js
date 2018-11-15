'use strict';
module.exports = function(app, options) {
    app.post('/upload', options.array("uploads[]", 12), function(req, res) {
        console.log('files', req.files);
        res.send(req.files);
    });
}