import { call, delay, put, takeLatest } from "redux-saga/effects";

import { STATUSCODE } from "../../../util/constants/settingSystem";

import { statusService } from "../../services/StatusService";
import { GET_ALL_STATUS, GET_ALL_STATUS_SAGA } from "../../constants/Cyberbugs/Cyberbugs";


function * getAllStatus (action){
    try {     
        //Gọi api lấy dữ liệu về
        const {data,status} = yield call(() => statusService.getAllStatus()); 

        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUSCODE.SUCCESS) {
    
       
            yield put ({
                type: GET_ALL_STATUS, 
                arrStatus : data.content
            })
        }
      
    } catch (err) {
      
        console.log(err.response.data);
    } 
   
}
export function* theoDoiGetAllStatusSaga(){
    yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatus); 
}





