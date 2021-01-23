import { call, delay, put, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from '../../services/CyberbugsService'; 
import { STATUSCODE } from "../../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/Loading/LoadingConst';
import { openNotificationWithIcon } from "../../../util/Notification/notificationCyberbugs";
import { history } from "../../../util/history/history";
import { GET_ALL_PROJECT_SAGA, UPDATE_TASK_SAGA, HANDLE_CHANGE_POST_API, CHANGE_TASK_MODAL, CHANGE_ASSINGEES, REMOVE_USER_ASSIGN } from "../../constants/Cyberbugs/Cyberbugs";
import { taskService } from "../../services/TaskService";
import { select } from "redux-saga/effects";


function * createTaskSaga (action){
    console.log(action);
    yield put({
        type: DISPLAY_LOADING
    }); 
    
    yield delay (500);  
    try {     
        //Gọi api lấy dữ liệu về
        const {data,status} = yield call(() => taskService.createTask(action.taskObject)); 
        console.log(status)
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUSCODE.SUCCESS) {
           console.log(status);
            openNotificationWithIcon('success', 'Get Project Detail', 'Create Task Successfully !!')
            // yield put ({
            //     type: "CREATE_TASK", 
            //     taskObject : data.content
            // })
        }
      
    } catch (err) {
        openNotificationWithIcon('error', 'Error', 'Error when creating task !!')
        console.log(err.response.data);
    } 
    yield put({
        type: "CLOSE_DRAWER"
    })
    yield put({
        type: HIDE_LOADING
    })
}
export function* theoDoiCreateTaskSaga(){
    yield takeLatest("CREATE_TASK_SAGA", createTaskSaga); 
}

function * getTaskDetailSaga (action){
    try {     
        //Gọi api lấy dữ liệu về
        yield delay(600)
        const {data,status} = yield call(() => taskService.getTaskDetail(action.taskId)); 
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUSCODE.SUCCESS) {
            yield put ({
                type : "GET_TASK_DETAIL_REDUCER", 
                taskDetailModal: data.content
            })
        }
    } catch (err) {
        console.log(err.response.data);
    } 
}
export function* theoDoiGetTaskDetailSaga(){
    yield takeLatest("GET_TASK_DETAIL_SAGA", getTaskDetailSaga); 
}

function * updateTaskStatusSaga (action){
    console.log("action", action)
    try {     
        //Gọi api lấy dữ liệu về
        const {data,status} = yield call(() => taskService.updateStatusTask(action.taskStatusUpdate));
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUSCODE.SUCCESS) {
            yield put ({
                type : "GET_PROJECT_DETAIL_SAGA", 
                id : action.taskStatusUpdate.id
            })
            yield put ({
                type : "GET_TASK_DETAIL_SAGA", 
                taskId : action.taskStatusUpdate.taskId
            })
        }
    } catch (err) {
        console.log(err.response.data);
    } 
}
export function* theoDoiUpdateTaskStatusSaga(){
    yield takeLatest("UPDATE_TASK_STATUS_SAGA", updateTaskStatusSaga); 
}

function * handleChangePostApi(action) {

//gọi action làm thay đổi taskDetail modal 
switch(action.actionType) {
    case CHANGE_TASK_MODAL: {
        let {name, value} = action; 
        yield put ({
            type: CHANGE_TASK_MODAL, 
            name, 
            value
        })
    }
    break; 
    case CHANGE_ASSINGEES: {
        const { userSelect } = action;
        yield put({
            type: CHANGE_ASSINGEES,
            userSelect
        })

    };
    break;
    // case CHANGE_ASSINGEES: { 
    //     let {userSelect} = action; 
    //     console.log("userSelect", userSelect);
    //     yield put ({
    //         type: CHANGE_ASSINGEES, 
    //         userSelect
    //     })
    // }
    // break; 
    case REMOVE_USER_ASSIGN : {
        let {userId} = action; 
        yield put ({
            type : REMOVE_USER_ASSIGN,
            userId 
        })
    } 
    break; 
    default : 
    console.log("abc");

}
//Save qua api updateTaskSaga 
//lấy dữ liệu từ state.taskDetailModal 
let {taskDetailModal} = yield select(state => state.TaskReducer); 
console.log("taskDetailModal sau khi thay đỗi",  taskDetailModal);
//biến đổi dữ liệu state.taskDetailModal thành dữ liệu api cần 
const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
    return user.id
})
const taskUpdateApi= {...taskDetailModal, listUserAsign}; 
try {
    const {data, status} = yield call(() => taskService.updateTask(taskUpdateApi))
    if(status === STATUSCODE.SUCCESS){
        

        yield put ({
            type : "GET_PROJECT_DETAIL_SAGA", 
            id : taskUpdateApi.projectId
        })
        yield put ({
            type : "GET_TASK_DETAIL_SAGA", 
            taskId : taskUpdateApi.taskId
        })
    }
} catch(error){
    console.log(error.response?.data)
}

}

export function *theoDoiHandleChangePostApi(action) {
    yield takeLatest(HANDLE_CHANGE_POST_API, handleChangePostApi)
}








