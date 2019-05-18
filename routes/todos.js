var express = require("express");
    router = express.Router();

var db = require("../models");
var helpers = require("../helpers/todos");

router.route("/")
    .get(helpers.getTodos)
    .post(helpers.createTodo)

router.route("/:todoId")
    .get(helpers.viewTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo)

module.exports = router;