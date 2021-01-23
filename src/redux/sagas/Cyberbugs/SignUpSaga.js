import { call, delay, put, takeLatest } from "redux-saga/effects";
import { signUpService, SignUpService } from "../../services/SignUpService";
import { STATUSCODE } from "../../../util/constants/settingSystem";
import {history} from '../../../util/history/history';
import { openNotificationWithIcon } from "../../../util/Notification/notificationCyberbugs";

function* userSignUpSaga(action) {
    //HIỂN THỊ LOADING
    console.log(action); 
    try {
        //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => signUpService.signUp(action.signUpData));
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUSCODE.SUCCESS) {
            // yield put({
            //     type: GET_ALL_TASK_TYPE, 
            //     arrTaskType : data.content
            // })
            openNotificationWithIcon('success', 'User SignUp', 'SignUp Successfully !!')
            console.log(status); 
            console.log(data);
            history.push("/login");
        }
    } catch (err) {
        console.log(err.response.data);}
}


export function* theoDoiUserSignUpSaga() {
    yield takeLatest("USER_SIGN_UP_SAGA", userSignUpSaga);
}