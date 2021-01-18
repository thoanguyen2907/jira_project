import { GET_ALL_PRIORITY_DROPDOWN } from "../constants/Cyberbugs/Cyberbugs"

const initialState = {
    arrPriority: []
}

const PriorityReducer =  (state = initialState, action) => {
    switch (action.type) {

    case GET_ALL_PRIORITY_DROPDOWN:
        state.arrPriority = action.arrPriority; 
        return { ...state }

    default:
        return state
    }
}
export default PriorityReducer; 
