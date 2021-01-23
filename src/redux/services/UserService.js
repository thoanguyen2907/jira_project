import { BaseService } from "./BaseService";

export class UserService extends BaseService{

    getUser = (keyword) => {
       return this.get(`/Users/getUser?keyword=${keyword}`)
    }
    assignUserProject = (userProject) => {
        return this.post(`Project/assignUserProject`, userProject); 
    }
    deleteUserFromProject = (userProject) => {
        return this.post(`Project/removeUserFromProject`, userProject)
    }
    getUserByProjectId = (idProject) => {
        return this.get(`Users/getUserByProjectId?idProject=${idProject}`)
    } 
    getAllUser = (keyword) => {
        return this.get(`Users/getUser?keyword=${keyword}`); 
    }
    deleteUserById = (userId) => {
        return this.delete(`Users/deleteUser?id=${userId}`)
    }
    editUserInfo = (userInfo) => {
        return this.put("Users/editUser", userInfo)
    }
}
export const userService = new UserService()



