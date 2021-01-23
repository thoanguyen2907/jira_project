import { call, delay, put, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from '../../services/CyberbugsService'; 
import { STATUSCODE } from "../../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/Loading/LoadingConst";

import { projectService } from "../../services/ProjectService";
import { openNotificationWithIcon } from "../../../util/Notification/notificationCyberbugs";
import { history } from "../../../util/history/history";
import { GET_ALL_PROJECT_SAGA } from "../../constants/Cyberbugs/Cyberbugs";
function* createProjectSaga(action) {
    //HIỂN THỊ LOADING
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay (500);

    try {

        //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => cyberbugsService.createProjectAuthorization(action.newProject));
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUSCODE.SUCCESS) {
            console.log(status)
            history.push('/projectmanagement');     
        }
    } catch (err) {
        console.log(err.response.data);
    // }  
    yield put({
        type: HIDE_LOADING
    })
}
}


export function* theoDoiCreateProjectSaga() {
    yield takeLatest('CREATE_PROJECT_SAGA', createProjectSaga);
}

//Saga dùng để get all project từ api 
//Khải - Code ngày dd/MM/yyyy

function *getListProjectSaga(action) { 
    try {
        const {data,status} = yield call( () => cyberbugsService.getListProject());
 
        //Sau khi lấy dữ liệu từ api về thành công
        if(status == STATUSCODE.SUCCESS) {
            yield put({
                type:'GET_ALL_PROJECT_LIST',
                projectList:data.content
            })
        }
    }catch(err) {
        console.log(err)
    }

}


export function* theoDoiGetListProjectSaga() {
    yield takeLatest('GET_LIST_PROJECT_SAGA', getListProjectSaga);
}

function * updateProjectSaga(action){
   console.log(action.projectUpdate);
yield put({
    type: DISPLAY_LOADING
}); 

yield delay (600);
try {

    //Gọi api lấy dữ liệu về
    const { data, status } = yield call(() => cyberbugsService.updateProject(action.projectUpdate));
    //Gọi api thành công thì dispatch lên reducer thông qua put
  
    yield put ({
        type: "GET_LIST_PROJECT_SAGA"
    })
    yield put({
        type: "CLOSE_DRAWER"
    })
} catch (err) {
    console.log(err.response.data);
}

yield put({
    type: HIDE_LOADING
})
}
//update project 
export function* theoDoiUpdateProjectSaga(){
    yield takeLatest("UPDATE_PROJECT_SAGA", updateProjectSaga); 
}
function * deleteProjectSaga (action){
    yield put({
        type: DISPLAY_LOADING
    }); 
    
    yield delay (500);  
    try {  
        
        //Gọi api lấy dữ liệu về
        const { status } = yield call(() => projectService.deleteProject(action.id)); 
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUSCODE.SUCCESS) {
            openNotificationWithIcon('success', 'Delete', 'Xoá Dự Án Thành Công !!')
   
    
        }
        yield put ({
            type: "GET_LIST_PROJECT_SAGA"
        })
    } catch (err) {
        openNotificationWithIcon('error', 'Error', 'Xảy ra lỗi khi xoá !!')
        console.log(err.response.data);
    }
    
    yield put({
        type: HIDE_LOADING
    })
}
export function* theoDoiDeleteProjectSaga(){
    yield takeLatest("DELETE_PROJECT_SAGA", deleteProjectSaga); 
}

function * getProjectDetailSaga (action){
    yield put({
        type: DISPLAY_LOADING
    }); 
    
    yield delay (500);  
    try {     
        //Gọi api lấy dữ liệu về
        const { status , data} = yield call(() => projectService.getProjectDetail(action.id)); 
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUSCODE.SUCCESS) {
 
            openNotificationWithIcon('success', 'Get Project Detail', 'Lấy Dự Án Thành Công !!')
            yield put ({
                type: "PUT_PROJECT_DETAIL", 
                projectDetail : data.content
            })
        }
      
    } catch (err) {
        openNotificationWithIcon('error', 'Error', 'Xảy ra lỗi khi cập nhật !!')
        console.log(err.response.data);
    } 
    yield put({
        type: HIDE_LOADING
    })
}
export function* theoDoiGetProjectDetailSaga(){
    yield takeLatest("GET_PROJECT_DETAIL_SAGA", getProjectDetailSaga); 
}

function * getAllProjectSaga (action){
    yield put({
        type: DISPLAY_LOADING
    }); 
    
    yield delay (500);  
    try {     
        //Gọi api lấy dữ liệu về
        const { status , data} = yield call(() => projectService.getAllProject()); 
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUSCODE.SUCCESS) {  
            
            yield put ({
                type: "GET_ALL_PROJECT_DROPDOWN_LIST", 
                arrProject : data.content
            })
           
        }
      
    } catch (err) {
        console.log(err.response.data);
    } 
    yield put({
        type: HIDE_LOADING
    })
}
export function* theoDoiGetAllProjectSaga(){
    yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga); 
}




