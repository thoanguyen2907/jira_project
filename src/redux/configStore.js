import { applyMiddleware, combineReducers, createStore } from "redux";

import LoadingReducer from './reducers/LoadingReducer'; 

import UserLoginCyberBugsReducer from './reducers/UserCyberBugsReducer'; 

import createMiddleWareSaga from 'redux-saga'; 
import {rootSaga} from './sagas/rootSaga'; 
import ProjectCategoryReducer from "./reducers/ProjectCategoryReducer";
import ProjectCyberBugsReducer from "./reducers/ProjectCyberBugsReducer";
import DrawerCyberbugsReducer from "./reducers/DrawerCyberbugsReducer";
import { ProjectEditReducer } from "./reducers/ProjectEditReducer";
import ProjectReducer from "./reducers/ProjectReducer";
import TaskTypeReducer from "./reducers/TaskTypeReducer";
import PriorityReducer from "./reducers/PriorityReducer";
import StatusReducer from "./reducers/StatusReducer";
import TaskReducer from "./reducers/TaskReducer";
import CommentReducer from "./reducers/CommentReducer";


const middleWareSaga = createMiddleWareSaga(); 


const rootReducer = combineReducers({

    LoadingReducer,
    UserLoginCyberBugsReducer, 
    ProjectCategoryReducer,
    ProjectCyberBugsReducer,
    DrawerCyberbugsReducer, 
    ProjectEditReducer, 
    ProjectReducer,
    TaskTypeReducer, 
    PriorityReducer ,
    StatusReducer ,
    TaskReducer, 
    CommentReducer 

}); 


const store = createStore(rootReducer, applyMiddleware(middleWareSaga));

 middleWareSaga.run(rootSaga); 
export default store; 