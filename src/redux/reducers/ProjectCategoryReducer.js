import { GET_ALL_PROJECT } from "../constants/Cyberbugs/Cyberbugs";

const stateDefault = {
arrayProjectCategory : []
}
const ProjectCategoryReducer = (state = stateDefault , action) => {
    switch (action.type) {
        case GET_ALL_PROJECT:
            let arrayCategory = action.data; 
            state.arrayProjectCategory = arrayCategory

            return {...state};
    
        default:
            break;
    }
        
       return {...state}
    
}

export default ProjectCategoryReducer; 