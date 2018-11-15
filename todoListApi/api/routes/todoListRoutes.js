'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');


  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // todoList Routes
  app.route('/test')
    //.get(todoList.list_all_tasks)
    .post(todoList.f);


  /*app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);*/
};