import { USER_LOGIN } from "../../util/constants/settingSystem";
import { GET_USER_BY_PROJECT_ID, GET_USER_SEARCH, USLOGIN } from "../constants/Cyberbugs/Cyberbugs";

let usLogin = {};

if(localStorage.getItem(USER_LOGIN)){
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN)); 
}

const stateDefault = {
    userLogin: usLogin,
    userSearch: [],
    arrUser: [] //array user for select create task
}
 const UserLoginCyberBugsReducer = (state = stateDefault, action) =>{
    switch(action.type){
        case USLOGIN: 
        state.userLogin = action.userLogin;
        return {...state}

        case GET_USER_SEARCH: 
        state.userSearch = action.listUserSearch; 
        return {...state}

        case GET_USER_BY_PROJECT_ID : 
        state.arrUser = action.arrUser; 
        return {...state}
        default: return {...state}
    }
}
export default UserLoginCyberBugsReducer