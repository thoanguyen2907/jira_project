import React from 'react';
import {useDispatch, useSelector} from 'react-redux'; 
import './Loading.css';

export default function Loading() {
    const isLoading =  useSelector(state => state.LoadingReducer.isLoading); 
    if(isLoading){
        return (
            <div className="loading">
                <img src={require("./../../assets/img/loading2.gif")} alt="loading"/>
            </div>
        )
    } else {
        return ""
    }
   
}
