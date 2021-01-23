import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
export default function ContentMain(props) {
    const dispatch = useDispatch(); 
    
    let {lstTask} = props.projectDetail; 

    const handleDragEnd = (result) => {
        let {id, taskId} = JSON.parse(result.draggableId);
        console.log(id, taskId ) 
        let {source, destination} = result; 
        if(!result.destination) {
            return;
        }
        if(source.index === destination.index && source.droppableId === destination.droppableId){
            return; 
        }
       
        //gọi api cập nhật lại status'
        dispatch({
            type: "UPDATE_TASK_STATUS_SAGA", 
            taskStatusUpdate: {
                taskId : taskId, 
                statusId: destination.droppableId, 
                id: id

            }
        })
    }
   const renderListTask = () => {
       return <DragDropContext onDragEnd = {handleDragEnd} >
       {
     lstTask?.map((item, index) => {
       return <Droppable key={index} droppableId={item.statusId}> 
       {(provided) => {
           return  <div 
          
           className="card" key = {index} style={{ width: '17rem', height: '25rem' }}>
       <div className="card-header">
         {item.statusName}
</div>
       <div className="list-group list-group-flush"
        ref={provided.innerRef}
         {...provided.droppableProps}
         key={index}
         style={{height: "100%", width: "100%"}}
         >
       {item.lstTaskDeTail?.map((task, index) => {
           return <Draggable key = {task.taskId.toString()} index={index} draggableId={JSON.stringify({
               id: task.projectId,
               taskId : task.taskId
           })} >
                    {(provided) => {
                        return <div
                        ref = {provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key = {index} className="list-group-item" data-toggle="modal" data-target="#infoModal" onClick = {()=>{
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
           </div>
                    }}
           </Draggable>
       })}         
       </div>
       {provided.placeholder}
   </div>
       }}
      
   </Droppable>
   })}
   </DragDropContext>
   }
    
    return (
       <>
           <div className="content" style={{ display: 'flex' }}>
                   
                          {renderListTask()}
                     
                    </div>
       </>
    )

}
