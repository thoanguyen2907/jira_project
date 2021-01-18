import { GET_ALL_PROJECT_DROPDOWN_LIST, GET_ALL_PROJECT_LIST } from "../constants/Cyberbugs/Cyberbugs";

const initialState = {
projectList : [],
arrProject: [] //get all project for dropdown
}

const ProjectCyberBugsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PROJECT_LIST: 
        state.projectList = action.projectList; 
        return {...state}
        case GET_ALL_PROJECT_DROPDOWN_LIST: 
        state.arrProject = action.arrProject; 
        return {...state}
    default:
        return {...state}
    }
}
export  default ProjectCyberBugsReducer; 