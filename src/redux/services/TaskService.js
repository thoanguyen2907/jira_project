import { BaseService } from "./BaseService";

export class TaskService extends BaseService{

    createTask = (taskObject) => {
        return this.post('Project/createTask',taskObject);
     }
    
    getTaskDetail = (taskId) => {
        return this.get(`Project/getTaskDetail?taskId=${taskId}`)
    }
    updateStatusTask = (taskStatusUpdate) => {
        return this.put(`Project/updateStatus`, taskStatusUpdate)
    }
    updateTask = (taskUpdateApi) => {
        return this.post(`Project/updateTask`,taskUpdateApi);
    }


}
export const taskService = new TaskService()