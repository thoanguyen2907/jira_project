
import { takeEvery } from 'redux-saga/effects';
import {push} from 'react-router-redux'; 
import { fork, take, call, takeLatest, put, delay } from 'redux-saga/effects';
import axios from 'axios';
import { cyberbugsService } from '../../services/CyberbugsService'; 
import { STATUSCODE } from '../../../util/constants/settingSystem';
import { GET_ALL_PROJECT, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../constants/Cyberbugs/Cyberbugs';

function * getAllProjectCategorySaga(action){
    try {
        let {data, status} = yield call(()=> cyberbugsService.getAllProjectCategory()); 
        if(status === STATUSCODE.SUCCESS){
          yield put({
              type: GET_ALL_PROJECT, 
              data: data.content
          })
        }; 
    } catch(error){
        console.log(error);
    }

}
export function * theoDoiGetAllCategory(){
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga)
}