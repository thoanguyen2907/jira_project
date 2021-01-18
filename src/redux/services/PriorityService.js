import { BaseService } from "./BaseService";

export class PriorityService extends BaseService{

    getAllPriorityList = () => {
        return this.get(`Priority/getAll`)
     }
   


}
export const priorityService = new PriorityService()