import { BaseService } from "./BaseService";

export class SignUpService extends BaseService{

    signUp = (signUpData) => {
        return this.post(`Users/signup`, signUpData)
     }
   


}
export const signUpService = new SignUpService()