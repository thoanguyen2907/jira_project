import { call, delay, put, takeLatest } from "redux-saga/effects";
import { signUpService, SignUpService } from "../../services/SignUpService";
import { STATUSCODE } from "../../../util/constants/settingSystem";
import {history} from '../../../util/history/history';
import { openNotificationWithIcon } from "../../../util/Notification/notificationCyberbugs";
import { CLOSE_DRAWER, CREATE_A_USER, GET_ALL_USERS_SAGA, USER_SIGN_UP_SAGA } from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/Loading/LoadingConst";

function* userSignUpSaga(action) {
    //HIỂN THỊ LOADING 
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(1000)
    try {
        //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => signUpService.signUp(action.signUpData));
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUSCODE.SUCCESS) {
            openNotificationWithIcon('success', 'User SignUp', 'SignUp Successfully !!')
            if(action.actionTyp3e === CREATE_A_USER) {
                yield put({
                    type: CLOSE_DRAWER
                })
                yield put({
                    type: GET_ALL_USERS_SAGA, 
                    keyword: ''
                })
            } else {
                history.push("/login");
            }
           
  

        }
    } catch (err) {
        console.log(err.response.data);}
        yield put({
            type: HIDE_LOADING
        })
}


export function* theoDoiUserSignUpSaga() {
    yield takeLatest(USER_SIGN_UP_SAGA, userSignUpSaga);
}