const fs= require('fs');
const parser = require("csv-parser");
const path  = require("path");
const CSV_FILE_PATH = path.join(__dirname, "./taskList.csv");

class TaskService {
    static async getAllTasks() {
        const result= [];
        return new Promise((resolve, reject) => {
            if(!fs.existsSync(CSV_FILE_PATH))
                return resolve([]);
            else 
                fs.createReadStream(CSV_FILE_PATH).pipe(parser())
                .on('data', (task) => result.push(task)).on( 'end', () => resolve(result)).
                on( 'error', (error) => reject(error));
        })
    }

    static #writeTasks(tasks){
        const headers = "id,title,name,priority";
        const rows = tasks.map(t => `"${t.id}","${t.title}","${t.name}","${t.priority}"`);
        fs.writeFileSync(CSV_FILE_PATH, [headers, ...rows].join('\n'));
    }

    static async getTaskById(id) {
        const tasks = await TaskService.getAllTasks();   // read
      const task = tasks.find((item) => item.id === id);
      return task || null;
    }

    static async createTask(data) {
        const newData = {
            id: new Date().toISOString(),
            title: data.title,
            name: data.name,
            priority: data.priority
        };
        const tasks = await TaskService.getAllTasks();
        tasks.push(newData);
        TaskService.#writeTasks(tasks);
        return newData;
    }

    static async updateTask(data) {
        const taskList = await TaskService.getAllTasks();
        taskList.map((item) => {
            if (data.name === item.name) {
                item.name = data.name;
                item.priority = data.priority;
                item.title = data.title;
            }
        });
        TaskService.#writeTasks(taskList);
    }
}

module.exports = { TaskService };
