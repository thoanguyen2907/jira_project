import { call, delay, put, takeLatest } from "redux-saga/effects";
import { STATUSCODE } from "../../../util/constants/settingSystem";
import { openNotificationWithIcon } from "../../../util/Notification/notificationCyberbugs";
import { CANCEL_EDIT_COMMENT, CLOSE_EDIT_COMMENT, DELETE_A_COMMENT_SAGA, EDIT_A_COMMENT_SAGA, GET_ALL_COMMENTS_REDUCER, GET_ALL_COMMENTS_SAGA, GET_PROJECT_DETAIL_SAGA, GET_TASK_DETAIL_SAGA, INSERT_A_COMMENT_SAGA } from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/Loading/LoadingConst";
import { commentService } from "../../services/CommentService";


function * getAllCommentSaga (action) {

    yield delay(1500); 
    try{
        const {data, status} = yield call(() => commentService.getAllComment(action.taskId));
        if(status === STATUSCODE.SUCCESS){
           
            yield put ({
                type: GET_ALL_COMMENTS_REDUCER, 
                arrComment : data.content
            })

        }
    }catch(error) {
        console.log(error.response);
    }
}
export function* theoDoiGetAllCommentSaga() {
    yield takeLatest(GET_ALL_COMMENTS_SAGA, getAllCommentSaga);
}


function* insertACommentSaga(action) {
    //HIỂN THỊ LOADING
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(1200)
    try {
        //Gọi api lấy dữ liệu về     
        const { data, status } = yield call(() => commentService.insertComment(action.comment));      
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUSCODE.SUCCESS) {
            yield put({

                type: GET_ALL_COMMENTS_SAGA, 
                taskId : action.comment.taskId
            })
          
            yield put ({
                type : GET_TASK_DETAIL_SAGA, 
                taskId : action.comment.taskId
            })
            yield put ({
                type : GET_PROJECT_DETAIL_SAGA, 
                id : action.comment.projectId
            })
            
        }
    } catch (err) {
        console.log(err.response.data);
    }
    yield put({
        type: HIDE_LOADING
    })
}


export function* theoDoiInsertACommentSaga() {
    yield takeLatest(INSERT_A_COMMENT_SAGA, insertACommentSaga);
}
function* editACommentSaga(action) {
    let {taskId, id, contentComment, projectId} = action; 
    console.log(action);
    //HIỂN THỊ LOADING
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(1200)
    try {
        //Gọi api lấy dữ liệu về     
        const { data, status } = yield call(() => commentService.editComment(id, contentComment));   
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUSCODE.SUCCESS) {
            openNotificationWithIcon("success", "Edit Comment", "Edit comment successfully !!!")
            yield put({

                type: GET_ALL_COMMENTS_SAGA, 
                taskId
            })
            yield put ({
                type : GET_TASK_DETAIL_SAGA, 
                taskId 
            })
            yield put ({
                type : GET_PROJECT_DETAIL_SAGA, 
                id : projectId
            }) 
        }
    } catch (err) {
        openNotificationWithIcon("warning", "Edit Comment", "Edit comment failed !!!")
        console.log(err.response.data);
    }
    yield put ({
        type: CLOSE_EDIT_COMMENT, 
        idComment : id
    })
    yield put({
        type: HIDE_LOADING
    })
}
export function* theoDoiEditACommentSaga(action) {
    yield takeLatest(EDIT_A_COMMENT_SAGA, editACommentSaga);
}

 function* deleteACommentSaga(action) {
    let {id, taskId, projectId} = action; 
   
    yield call(() => commentService.deleteComment(id)); 
    yield delay(1500)

//    try{
//     const { data, status } = yield call(() => commentService.deleteComment(id));    

//     if(status === STATUSCODE.SUCCESS){
//         console.log(status)
        yield put({
            type: GET_ALL_COMMENTS_SAGA, 
            taskId
        })
      
        yield put ({
            type : GET_TASK_DETAIL_SAGA, 
            taskId
        })
        yield put ({
            type : GET_PROJECT_DETAIL_SAGA, 
            id : projectId
        })
//     }
//    } catch(error) {
//     console.log(error);
//    }
//    yield put({
//     type: HIDE_LOADING
// })
}
export function* theoDoiDeleteACommentSaga(action) {
    yield takeLatest(DELETE_A_COMMENT_SAGA, deleteACommentSaga);
}