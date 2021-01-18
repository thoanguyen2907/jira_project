import { CHANGE_ASSINGEES, CHANGE_TASK_MODAL } from "../constants/Cyberbugs/Cyberbugs";

const initialState = {
  taskDetailModal : {
    "priorityTask": {
      "priorityId": 1,
      "priority": "High"
    },
    "taskTypeDetail": {
      "id": 1,
      "taskType": "bug"
    },
    "assigness": [],
    "lstComment": [],
    "taskId": 54,
    "taskName": "task 1",
    "alias": "task-1",
    "description": "",
    "statusId": "2",
    "originalEstimate": 30,
    "timeTrackingSpent": 10,
    "timeTrackingRemaining": 10,
    "typeId": 1,
    "priorityId": 1,
    "projectId": 109
  }
}

 const TaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_TASK_DETAIL_REDUCER" : {
            state.taskDetailModal = action.taskDetailModal; 
            return {...state}
        }
        case CHANGE_TASK_MODAL: {
          let {name, value} = action; 
          return {...state, taskDetailModal: {...state.taskDetailModal, [name] : value}}
        }
        // case CHANGE_ASSINGEES : {
        //   state.taskDetailModal.assigness = [...state.taskDetailModal.assigness, action.userSelect];
        //   console.log("state taskmodal assigness", state.taskDetailModal.assigness);
        //   return {...state}
        // }
        case CHANGE_ASSINGEES : {
          state.taskDetailModal.assigness = [...state.taskDetailModal.assigness,action.userSelect];
          console.log("state task modal assigness", state.taskDetailModal.assigness);
          // console.log('state',state)
          return {...state}
        }
        case "REMOVE_USER_ASSIGN" : {
          state.taskDetailModal.assigness = [...state.taskDetailModal.assigness.filter(us => us.id !== action.userId)];
          return {...state}
        }
    default:
      return {...state}
    }
}
export default TaskReducer; 
