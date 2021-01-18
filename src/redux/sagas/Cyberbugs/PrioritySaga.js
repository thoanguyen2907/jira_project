import { call, delay, put, takeLatest } from "redux-saga/effects";
import { priorityService } from "../../services/PriorityService";

import { STATUSCODE } from "../../../util/constants/settingSystem";
import { GET_ALL_PRIORITY_DROPDOWN, GET_ALL_PRIORITY_LIST_SAGA } from "../../constants/Cyberbugs/Cyberbugs";


function* getAllPriorityList(action) {
    //HIỂN THỊ LOADING
    try {
        //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => priorityService.getAllPriorityList());
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUSCODE.SUCCESS) {
            yield put({
                type: GET_ALL_PRIORITY_DROPDOWN, 
                arrPriority : data.content
            })
        }
    } catch (err) {
        console.log(err.response.data);}
}


export function* theoDoiGetAllPriorityList() {
    yield takeLatest(GET_ALL_PRIORITY_LIST_SAGA, getAllPriorityList);
}