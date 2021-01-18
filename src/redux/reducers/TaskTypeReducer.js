import { GET_ALL_TASK_TYPE } from "../constants/Cyberbugs/Cyberbugs";

const initialState = {
    arrTaskType : []
}

 const TaskTypeReducer = (state = initialState, action) => {
    switch (action.type) {

    case GET_ALL_TASK_TYPE :
        state.arrTaskType = action.arrTaskType
        return { ...state}

    default:
        return state
    }
}

export default TaskTypeReducer; 