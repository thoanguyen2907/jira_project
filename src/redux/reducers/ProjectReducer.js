import { EDIT_PROJECT, PUT_PROJECT_DETAIL } from "../constants/Cyberbugs/Cyberbugs";

const initialState = {
    projectEdit: {
        "id": 0,
        "projectName": "string",
        "description": "string",
        "categoryId": "string"
},
    projectDetail : {

    }
    }

const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {

    case EDIT_PROJECT:
      
        state.projectEdit = action.projectEditDrawer; 
        return { ...state }
    case PUT_PROJECT_DETAIL: 
    state.projectDetail = action.projectDetail; 
    
    return { ...state }
    default:
        return state
    }
}
export default ProjectReducer; 
