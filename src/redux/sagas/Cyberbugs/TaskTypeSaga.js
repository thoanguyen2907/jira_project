import { call, delay, put, takeLatest } from "redux-saga/effects";
import { taskTypeService } from "../../services/TaskTypeService";
import { STATUSCODE } from "../../../util/constants/settingSystem";
import { GET_ALL_TASK_TYPE, GET_ALL_TYPE_TASK_SAGA } from "../../constants/Cyberbugs/Cyberbugs";

function* getAllTypeTaskSaga(action) {
    //HIỂN THỊ LOADING
    try {
        //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => taskTypeService.getAllTaskType());
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUSCODE.SUCCESS) {
            yield put({
                type: GET_ALL_TASK_TYPE, 
                arrTaskType : data.content
            })
        }
    } catch (err) {
        console.log(err.response.data);}
}


export function* theoDoiGetAllTypeTaskSaga() {
    yield takeLatest(GET_ALL_TYPE_TASK_SAGA, getAllTypeTaskSaga);
}