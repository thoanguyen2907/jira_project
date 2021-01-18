import { EDIT_PROJECT_SAGA_DRAWER } from "../constants/Cyberbugs/Cyberbugs"

const initialState = {
    projectEdit: {
        "id": 0,
        "projectName": "string",
        "creator": 0,
        "description": "string",
        "categoryId": "string"
      }}
    export const ProjectEditReducer = (state = initialState, action) => {
        switch (action.type) {
    
        case EDIT_PROJECT_SAGA_DRAWER:
            state.projectEdit = action.projectEditModal
            return { ...state}
    
        default:
            return state
        }
    }
    