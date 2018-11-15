var express = require('express');
var multer = require('multer');
var path = require('path');
var app = express();
var port = 3003;

var checkIdPictureRoute = require('./api/controllers/check-id-picture.controller.js');

// Configuration
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var options = multer({ storage: storage });

// Routings
checkIdPictureRoute(app, options);

var server = app.listen(port, function () {
  console.log("Listening on port %s...", port);
});

