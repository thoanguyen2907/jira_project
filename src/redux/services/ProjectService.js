import { BaseService } from "./BaseService";

export class ProjectService extends BaseService{
   
    deleteProject = (id) => {
       return this.delete(`Project/deleteProject?projectId=${id}`)
    }
    getAllProject = () => {
        return this.get(`Project/getAllProject`)
     }
    updateProject = (model) => {
        return this.put(`Project/updateProject?projectId=${model.id}`, model)
     }
    createProject = (model) => {
        return this.post("Project/createProject", model)
    }
   getProjectDetail = (id) => {
       return this.get(`Project/getProjectDetail?id=${id}`)
   }


}
export const projectService = new ProjectService()