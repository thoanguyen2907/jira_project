import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentMain from '../../../components/CyberBugs/Main/ContentMain';
import HeaderMain from '../../../components/CyberBugs/Main/HeaderMain';
import InforMain from '../../../components/CyberBugs/Main/InforMain';
import { GET_PROJECT_DETAIL_SAGA } from '../../../redux/constants/Cyberbugs/Cyberbugs';
import './../../../index.css';

export default function IndexCyberBugs(props) {
    let {projectDetail} = useSelector(state => state.ProjectReducer); 
    console.log("params",  props.match.params.projectId);
    const dispatch = useDispatch(); 
    useEffect(() => {
        const projectId = props.match.params.projectId;
        dispatch({
            type: GET_PROJECT_DETAIL_SAGA, 
            id : projectId
        })
    }, [])
    return (
        <div className="main">
           <HeaderMain/>
           <InforMain members = {projectDetail.members} 
                    projectName = {projectDetail.alias}
                    description  = {projectDetail.description}
                    />
            <ContentMain projectDetail = {projectDetail}/>

        </div>
    )
}
