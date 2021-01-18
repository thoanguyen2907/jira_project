import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
export default function ContentMain(props) {
    const dispatch = useDispatch(); 
    
    let {lstTask} = props.projectDetail; 
   const renderListTask = () => {
   return  lstTask?.map((item, index) => {
       return <div className="card" key = {index} style={{ width: '17rem', height: '25rem' }}>
       <div className="card-header">
         {item.statusName}
</div>
       <ul className="list-group list-group-flush">
       {item.lstTaskDeTail?.map((task, index) => {
           return <li key = {index} className="list-group-item" data-toggle="modal" data-target="#infoModal" style={{ cursor: 'pointer' }} onClick = {()=>{
              dispatch({
                  type : "GET_TASK_DETAIL_SAGA", 
                  taskId : task.taskId
              })
           }}>
               <p className="font-weight-bold"> {task.taskName} </p>
               <div className="block" style={{ display: 'flex' }}>
                   <div className="block-left">
                       <p className="text-danger">{task.priorityTask.priority}</p>
                   </div>
                   <div className="block-right">
                       <div className="avatar-group" style={{ display: 'flex' }}>
                       {task.assigness?.map((mem, index) => {
                           return  <div className="avatar" key = {index}>
                               <img src={mem.avatar} alt={mem.avatar} />
                           </div>
                       })}
                          
                       </div>
                   </div>
               </div>
           </li>
       })}
           
          
       </ul>
   </div>
   })
    }
    return (
       <>
           <div className="content" style={{ display: 'flex' }}>
                   
                          {renderListTask()}
                     
                    </div>
       </>
    )
}
