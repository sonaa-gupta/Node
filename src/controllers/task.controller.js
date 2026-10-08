const { TaskService } = require("../services/task.service");

class TaskController {

    static async getAllTasks(req, res) {
        const tasks = await TaskService.getAllTasks();
        return res.status(200).json({ success: true, data: tasks });
    }

    static async getTaskById(req, res) {
        const { id } = req.params;
        const task = await TaskService.getTaskById(id);
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
        return res.status(200).json({ success: true, data: task });
    }

    static async createTask(req, res, next) {
        const { title, name, priority } = req.body;
        if (!title || !name) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            });
        }
        try {
            const response = await TaskService.createTask(req.body);
            return res.status(201).send(response);
        }
        catch (error) {
            next(error);
        }
    }

    static async updateTask(req, res, next) {
        const { title } = req.body;
        try {
            const response = await TaskService.updateTask(req.body);
            return res.status(201).send({ message: "task updated" });
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = { TaskController };
