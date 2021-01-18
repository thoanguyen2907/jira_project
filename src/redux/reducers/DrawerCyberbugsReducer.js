import React from 'react';
import { CLOSE_DRAWER, OPEN_DRAWER, OPEN_FORM_CREATE_TASK, OPEN_FORM_EDIT_PROJECT, SET_SUBMIT_CREATE_PROJECT, SET_SUBMIT_EDIT_PROJECT } from '../constants/Cyberbugs/Cyberbugs';
const initialState = {
    visible: false, 
    title : '', 
    ComponentDrawerContent: <p>Default content</p>, 
   callBackSubmit: (propsValue) => { alert('click demo!') }
}


 const DrawerCyberbugsReducer = (state = initialState, action) => {
    switch (action.type) {

    case OPEN_DRAWER:
        return { ...state, visible: true }

    case CLOSE_DRAWER: 
    return { ...state, visible: false }
    
    case OPEN_FORM_EDIT_PROJECT:  
        return {...state, visible: true, ComponentDrawerContent: action.Component, title: action.title}
    case OPEN_FORM_CREATE_TASK: 
    return {...state, visible: true, ComponentDrawerContent: action.Component, title: action.title}
    case SET_SUBMIT_EDIT_PROJECT: 
        state.callBackSubmit = action.submitFunction;
        return {...state}
    case SET_SUBMIT_CREATE_PROJECT: 
        state.callBackSubmit = action.submitFunction;
        return {...state}

    default:
        return state
    }
}
export default DrawerCyberbugsReducer
