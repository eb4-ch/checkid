//var todoListController = require ('./api/controllers/todoListController.js');
//var myFunction  = todoListController.f;
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
var route = require ('./api/routes/todoListRoutes.js')
route(app);
app.listen(port);

console.log('todo list RESTful API server started on: ' + port);