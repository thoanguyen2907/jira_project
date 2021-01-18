
import { takeEvery } from 'redux-saga/effects';

import { fork, take, call, takeLatest, put, delay } from 'redux-saga/effects';
import axios from 'axios';
import {ADD_USER_PROJECT_API, DELETE_USER_PROJECT_API, GET_LIST_PROJECT_SAGA, GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA, USER_SIGNIN_API, USLOGIN} from './../../constants/Cyberbugs/Cyberbugs'; 
import { cyberbugsService } from '../../services/CyberbugsService'; 
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/Loading/LoadingConst';
import { STATUSCODE, TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem';
import {history} from '../../../util/history/history';
import { userService } from '../../services/UserService';
//Quản lý các action saga

function * signinSaga(action){
    yield delay (1000); 
    yield put({
        type: DISPLAY_LOADING
    });
//gọi api 
try {
  const {data, status} = yield cyberbugsService.signinCyberBugs(action.userLogin) ; 
  //lưu vào local store khi đăng nhập sucessfull
  localStorage.setItem(TOKEN, data.content.accessToken); 
  localStorage.setItem(USER_LOGIN,JSON.stringify(data.content)); 
// yield put(push("/home")); 
// action.userLogin.history.push("./home");
    yield put({
        type: USLOGIN,
        userLogin: data.content
    })
history.push("/");

} catch(err){
    console.log(err.response.data)
}
yield put({
    type: HIDE_LOADING
});
}

export function * theoDoiSignin(){
    yield takeLatest(USER_SIGNIN_API, signinSaga); 
}
 function * getUserSaga(action){
     
     try {
        const {data, status} = yield call(()=> userService.getUser(action.keyword)); 

        if(status === STATUSCODE.SUCCESS){

            yield put({
                type: "GET_USER_SEARCH", 
                listUserSearch: data.content
            })
        }
     }  catch(error){
        console.log(error);
     }
 }
export function * theoDoiGetUser(){
    yield takeLatest("GET_USER_API", getUserSaga)
}
function * addUserProject(action){
    try {
        const {data, status} = yield call(()=> userService.assignUserProject(action.userProject)); 
        console.log(data);
        if(status === STATUSCODE.SUCCESS){
           yield put ({
            type: GET_LIST_PROJECT_SAGA
        })
        }
     }  catch(error){
        console.log(error);
     }
}
export function * theoDoiAddUser(){
    yield takeLatest(ADD_USER_PROJECT_API, addUserProject)
}

function * deleteUserProject(action){
    console.log(action);
    try {
        const {data, status} = yield call(()=> userService.deleteUserFromProject(action.userProject)) ; 
        console.log(data);
        if(status === STATUSCODE.SUCCESS){
           yield put ({
            type: GET_LIST_PROJECT_SAGA
        })
        }
     }  catch(error){
        console.log(error.response.data);
     }
}
export function * theoDoiDeleteUserProject(){
    yield takeLatest(DELETE_USER_PROJECT_API, deleteUserProject)
}
function * getUserByProjectID(action){
    console.log(action);
    try {
        const {data, status} = yield call(()=> userService.getUserByProjectId(action.idProject)) ; 
       
        if(status === STATUSCODE.SUCCESS){
           yield put ({
            type: GET_USER_BY_PROJECT_ID, 
            arrUser : data.content
        })
        }
     }  catch(error){
        console.log(error.response.data);
     }
}
export function * theoDoiGetUserByProjectId(){
    yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectID)
}