const { TaskController } = require("../controllers/task.controller");

const express = require("express");

const routes = express.Router();

routes.get("/", TaskController.getAllTasks);
routes.post('/', TaskController.createTask);
routes.put('/', TaskController.updateTask);
routes.get('/:id', TaskController.getTaskById);

module.exports = routes;