import { takeEvery } from 'redux-saga/effects';
import {fork, take, call, takeLatest, put, all} from 'redux-saga/effects'; 
import axios from 'axios';

import * as Cyberbugs from './Cyberbugs/UserCyberBugsSaga'; 

import * as ProjectCategory from './Cyberbugs/ProjectCategorySaga'; 
import * as ProjectSaga from './Cyberbugs/ProjectSaga'; 
import * as TaskTypeSaga from './Cyberbugs/TaskTypeSaga'; 
import * as PrioritySaga from './Cyberbugs/PrioritySaga'; 
import * as TaskSaga from './Cyberbugs/TaskSaga'; 
import * as StatusSaga from './Cyberbugs/StatusSaga'; 
import * as CommentSaga from './Cyberbugs/CommentSaga'; 
import * as SignUpSaga from './Cyberbugs/SignUpSaga'; 
export function * rootSaga(){
//    yield fork(getTaskAPI);  

yield all([
    Cyberbugs.theoDoiSignin(), 

    ProjectCategory.theoDoiGetAllCategory(),
    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoiGetListProjectSaga(),
    ProjectSaga.theoDoiUpdateProjectSaga(),
    ProjectSaga.theoDoiDeleteProjectSaga(), 
    ProjectSaga.theoDoiGetProjectDetailSaga(),
    ProjectSaga.theoDoiGetAllProjectSaga(), 

    Cyberbugs.theoDoiGetUser(),
    Cyberbugs.theoDoiAddUser(),
    Cyberbugs.theoDoiGetUserByProjectId(),
    Cyberbugs.theoDoiDeleteUserProject(),
    Cyberbugs.theoDoiGetAllUserSaga(),
    Cyberbugs.theoDoiDeleteUserFromListSaga(), 
    Cyberbugs.theoDoiEditUserInfoSaga(), 
    
    TaskTypeSaga.theoDoiGetAllTypeTaskSaga(),
    PrioritySaga.theoDoiGetAllPriorityList(),
    TaskSaga.theoDoiCreateTaskSaga(),
    TaskSaga.theoDoiGetTaskDetailSaga(),
    TaskSaga.theoDoiUpdateTaskStatusSaga(), 
    TaskSaga.theoDoiHandleChangePostApi(), 

    StatusSaga.theoDoiGetAllStatusSaga(),

    CommentSaga.theoDoiInsertACommentSaga(),
    CommentSaga.theoDoiGetAllCommentSaga(),
    CommentSaga.theoDoiEditACommentSaga(),
    CommentSaga.theoDoiDeleteACommentSaga(),

    SignUpSaga.theoDoiUserSignUpSaga()


])


} 