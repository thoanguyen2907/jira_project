import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_ASSINGEES, CHANGE_TASK_MODAL, CLOSE_EDIT_COMMENT, DELETE_A_COMMENT_SAGA, EDIT_A_COMMENT_SAGA, GET_ALL_PRIORITY_LIST_SAGA, GET_ALL_STATUS_SAGA, GET_ALL_TYPE_TASK_SAGA, HANDLE_CHANGE_POST_API, OPEN_EDIT_COMMENT, REMOVE_USER_ASSIGN } from '../../../redux/constants/Cyberbugs/Cyberbugs';
import ReactHtmlParser from "react-html-parser";
import { Editor } from '@tinymce/tinymce-react'; 
import { Select } from 'antd';
import img1 from '../../../assets/img/download (1).jfif';

export default function ModalCyberBugs() {
    const { taskDetailModal } = useSelector(state => state.TaskReducer);
    const { arrStatus } = useSelector(state => state.StatusReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
    const {projectDetail} = useSelector(state => state.ProjectReducer); 
    const {arrComment} = useSelector(state => state.CommentReducer) 
    const [historyContent, setHistoryContent] = useState(taskDetailModal.description);
    const [content, setContent] = useState(taskDetailModal.description);
    const [comment, setComment] = useState('');
    const [visibleEditor, setVisibleEditor] = useState(false); 
    // const [visibleCommentEdit, setVisibleCommentEdit] = useState(openEditor); 
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: GET_ALL_STATUS_SAGA });
        dispatch({ type: GET_ALL_PRIORITY_LIST_SAGA });
        dispatch({ type: GET_ALL_TYPE_TASK_SAGA}); 
        dispatch({
            type: "GET_ALL_COMMENTS_SAGA", 
            taskId: taskDetailModal.taskId
        })
    }, [taskDetailModal.taskId]);

    const renderDescription = () => {
        const jsxDescription = ReactHtmlParser(taskDetailModal.description);
        return <div> 
        {visibleEditor ? <div>
            <Editor
                    name="description"
            
                    initialValue = {taskDetailModal.description}
                    init={{
                        selector: 'textarea#myTextArea',
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={(content, editor) => {
                            setContent(content)
                        }}
                />
                <button className="btn btn-primary" onClick = {()=>{
                    dispatch({
                        type: HANDLE_CHANGE_POST_API, 
                        actionType : CHANGE_TASK_MODAL, 
                        name : "description", 
                        value : content
                    })
                    
                    setVisibleEditor(false)
                }}
                >Save</button>
                <button className="btn btn-success" onClick = {()=>{
                    // setHistoryContent(historyContent)
                    dispatch({
                        type:HANDLE_CHANGE_POST_API,
                        actionType:CHANGE_TASK_MODAL,
                        name: 'description',
                        value: historyContent
                    })
                    setVisibleEditor(false)
              
                }}>Close</button>
        </div> 
        :  <div onClick={()=> {
            setHistoryContent(taskDetailModal.description)
            setVisibleEditor(!visibleEditor)}}
            >{jsxDescription}</div>  }
        </div>;
    }
    const handleChange = (e) => {
        const {name, value} = e.target; 
        dispatch({
            type: HANDLE_CHANGE_POST_API, 
            actionType:CHANGE_TASK_MODAL,
            name, 
            value
        })
        // dispatch({
        //     type : CHANGE_TASK_MODAL,
        //     name, 
        //     value
        // })
    }

    const renderTimeTracking = () => {

        const {timeTrackingSpent,timeTrackingRemaining} = taskDetailModal;
        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
        const percent = Math.round( Number(timeTrackingSpent)/max * 100 );

        return <div>
        <div style={{ display: 'flex' }}>
            <i className="fa fa-clock" />
            <div style={{ width: '100%' }}>

                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className="logged">{Number(timeTrackingRemaining)}h logged</p>
                    <p className="estimate-time">{Number(timeTrackingRemaining)}h remaining</p>
                </div>
            </div>
            </div>
            <div style={{ width: '100%' }}>

<div className="row"> 
<div className="col-6">
<input type="text" className="form-control" name ="timeTrackingSpent" onChange = {handleChange}/>
</div>
<div className="col-6">
  <input type="text" className="form-control" name ="timeTrackingRemaining" onChange = {handleChange}/>
</div>
</div>
        </div>
        </div>
    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
                <div className="modal-dialog modal-info">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="task-title">
                                <i className="fa fa-bookmark" />
                                <select name="typeId" value = {taskDetailModal.typeId} onChange={handleChange}>
                                    {arrTaskType?.map((type, index) => {
                                        return <option key={index} value = {type.id}> {type.taskType}</option>
                                    })} 
                                </select>
                                <span>{taskDetailModal.taskName}</span>
                            </div>
                            <div style={{ display: 'flex' }} className="task-click">
                                <div>
                                    <i className="fab fa-telegram-plane" />
                                    <span style={{ paddingRight: 20 }}>Give feedback</span>
                                </div>
                                <div>
                                    <i className="fa fa-link" />
                                    <span style={{ paddingRight: 20 }}>Copy link</span>
                                </div>
                                <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-8">
                                        <p className="issue">This is an issue of type: Task.</p>
                                        <div className="description my-4">
                                       
                                            <h5 className="text-danger">Description</h5>
                                            {renderDescription()}
                                        </div>
                                      
                                        <div className="comment my-3">
                                            <h6>Comment</h6>
                                            <div className="block-comment" style={{ display: 'flex' }}>
                                                <div className="avatar">
                                                    <img src={img1} alt="hinhAnh" />
                                                </div>
                                <form className="input-comment" onSubmit = {handleSubmit}>
                             <Editor
                    name="comment"
                    initialValue ='Add a comment'
                    init={{
                        selector: 'textarea#myTextArea',
                        height: 150,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={(content, editor) => {
                            // const jsxContent = ReactHtmlParser(content);
                            
                            setComment(content); 
            
                        }}
                />
                <div className="btn-comment-group mt-2">
                <button className="btn btn-primary" type="submit" onClick={()=>{
                             dispatch({
                                type: "INSERT_A_COMMENT_SAGA",
                                comment : {
                                    "taskId": taskDetailModal.taskId,
                                    "contentComment": comment,
                                    "projectId" :taskDetailModal.projectId
                                }

                            })
                        
                }}>Save</button>
                <button className="btn btn-default ml-3" type="button" onClick={()=>{
                    setComment('')
                }}>Cancel</button>
                </div>    
                                                </form>
                                            </div>
                                            <div className="lastest-comment">
                                                <div className="comment-item">
                                                    <div className="display-comment">
                                                            {arrComment?.map((item, index) => {
                                                          
                                                              
                                                                return <div key={index} className="row my-3">
                                                                <div className="col-1">
                                                                <div className="avatar">
                                                                         <img src={item.user?.avatar} alt="hinhAnh"/>       
                                                                </div>
                                                                </div>
                                                                <div className = "col-8">
                                                                <p style={{ marginBottom: 5 }}>
                                                                        {item.user?.name}
                                                                    </p>
                         {item?.openEditor ?  <div>
                     {/* <Editor
                    name="commentEdit"
                    initialValue ={item.contentComment}
                    init={{  
                        height: 150,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help'
                        ],                     
                        toolbar:
                            'undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code',
                        
                        }}
                        onEditorChange={(content, editor) => {
                            // const jsxContent = ReactHtmlParser(content);
                            setComment(content); 
                        }}                     
                        /> */}
                        <input type="text" className="form-control" name="contentComment"
                         value = {comment}
                         onChange = {(e)=>{
                            let {value} = e.target; 
                  
                             setComment(value);
                        }}/>
                        <div className="btn-edit-comment mt-2">
                            <button className = "btn btn-primary nr-2" onClick = {() => {
                                dispatch({
                                    type: EDIT_A_COMMENT_SAGA, 
                                    id : item.id, 
                                    contentComment:comment, 
                                    projectId: taskDetailModal.projectId, 
                                    taskId: taskDetailModal.taskId
                                })
                            }}>Save Comment</button>
                            <button className = "btn btn-success ml-2" onClick={()=>{            
                   dispatch({
                       type: CLOSE_EDIT_COMMENT,
                       idComment: item.id
                   })
               }}>Cancel Comment</button>
                        </div>
                 </div>: <div> {ReactHtmlParser(item?.contentComment)}
                 <span style={{ color: '#444422' }} onClick={()=>{
                   
                                                                    dispatch({
                                                                        type: OPEN_EDIT_COMMENT,
                                                                        id: item.id,    
                                                                        contentComment: item.contentComment
                                                                    })
                                                                    setComment(item.contentComment)
                                                                }} >Edit</span>                       
                                                                <span style={{ color: '#929398' }} className="ml-3"
                                                               onClick = {()=>{
                                                                   dispatch({
                                                                       type: DELETE_A_COMMENT_SAGA, 
                                                                       id: item.id, 
                                                                       taskId : taskDetailModal?.taskId,
                                                                       projectId: taskDetailModal?.projectId
                                                                   })
                                                               }}
                                                                >Delete</span>
                 </div>}
                                                               
                                                               
                                                            </div>
                                                            </div> 
                                                            })}
                                                       
                                                           
                                                       
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="status">
                                            <h6>STATUS</h6>
                                            <select name = "statusId" className="custom-select" onChange = {(e)=>{      
                                                handleChange(e)                                      
                                                // dispatch({
                                                //     type: "UPDATE_TASK_STATUS_SAGA", 
                                                //     taskStatusUpdate : {
                                                //         taskId : taskDetailModal.taskId, 
                                                //         statusId : e.target.value,
                                                //         id :  taskDetailModal.projectId //projectId
                                                //     }
                                                // })                     
                                            }}>
                                            {arrStatus.map((status, index) => {
                    return <option value={status.statusId} key={index}>{status.statusName}</option>})}
                                            </select>
                                        </div>
                                        <div className="assignees">
                                            <h6>ASSIGNEES</h6>
                                            <div>
                                            {
                                                taskDetailModal.assigness?.map((user, index) => {
                                                    return <div key={index} style={{ display: 'flex' }} className="item">
                                                        <div className="avatar">
                                                            <img src={user.avatar} alt={user.avatar} />
                                                        </div>
                                                        <p className="name mt-1 ml-1">
                                                            {user.name}
                                                            <i className="fa fa-times" style={{ marginLeft: 5, cursor: "pointer" }}
                                                            onClick = {()=>{
                                                                dispatch({
                                                                    type: HANDLE_CHANGE_POST_API, 
                                                                    actionType: REMOVE_USER_ASSIGN, 
                                                                    userId : user.id 
                                                                })
                                                                // dispatch({
                                                                //     type : "REMOVE_USER_ASSIGN",
                                                                //     userId : user.id
                                                                // })
                                                            }} />
                                                        </p>
                                                    </div>
                                                })
                                            }
                                                <div className="col-12 mt-2 mb-2">
                                                 
                                                    <Select name="lstUser" className="form-control"
                                                    value = "Add more"
                                                    options =  {projectDetail.members?.filter(mem => {
                                                            let index = taskDetailModal.assigness?.findIndex(us => us.id == mem.userId); 
                                                            if(index !== -1) {
                                                                return false; 
                                                            } 
                                                            return true
                                                        })?.map((mem, index) => {
                                                            return {value : mem.userId, label : mem.name}    
                                                             })}
                                                    optionFilterProp = "label"
                                                    style = {{width: "100%"}}
                                                    onSelect = {(value) => {
                                                        if(value !== 0) {
                                                           
                                                        let userSelect = projectDetail.members.find(mem => mem.userId == value); 
                                                        userSelect = {...userSelect, id: userSelect.userId}
                                                    
                                                        //dispatchReducer
                                                        dispatch({
                                                            type: HANDLE_CHANGE_POST_API,
                                                            actionType: CHANGE_ASSINGEES,
                                                            userSelect
                                                        })
                                                        // dispatch({
                                                        //     type: CHANGE_ASSINGEES,
                                                        //     userSelect
                                                        // }) 
                                                        } else {
                                                            return;  
                                                        }
                                                        
                                                    }} >
                                                   
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                       
                                        <div className="priority" name = "priorityId" style={{ marginBottom: 20 }}>
                                            <h6>PRIORITY</h6>
                                            <select name="priorityId" className="form-control" value={taskDetailModal.priorityId} onChange={(e) => {
                                            handleChange(e);
                                        }}>
                                            {arrPriority.map((item, index) => {
                                                return <option key={index} value={item.priorityId}>{item.priority}</option>
                                            })}
                                            </select>
                                        </div>
                                        <div className="estimate">
                                            <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                            <input type="text" name = "originalEstimate" className="estimate-hours" value={taskDetailModal.originalEstimate}
                                        onChange = {handleChange} />
                                        </div>
                                        <div className="time-tracking">
                                            <h6>TIME TRACKING</h6>
                                            {
                                            renderTimeTracking()
                                        }
                                        </div>
                                        <div style={{ color: '#929398' }}>Create at a month ago</div>
                                        <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
