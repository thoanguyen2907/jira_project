import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect, useState } from 'react'; 
import { withFormik } from 'formik';
import * as Yup from 'yup'
import { connect, useSelector, useDispatch } from 'react-redux'; 
import { Select, Radio,Slider } from 'antd';

import { GET_ALL_PRIORITY_LIST_SAGA, GET_ALL_PROJECT_SAGA, GET_ALL_STATUS_SAGA, GET_ALL_TYPE_TASK_SAGA, GET_USER_BY_PROJECT_ID_SAGA } from '../../../redux/constants/Cyberbugs/Cyberbugs';

const { Option } = Select;

const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
 function FormCreateTask(props) {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        setFieldValue
    } = props;

    //Lấy dữ liệu từ redux 
     const {arrProject} = useSelector(state=>state.ProjectCyberBugsReducer);
     const {arrStatus} =useSelector(state => state.StatusReducer);
     const {arrTaskType} = useSelector(state=>state.TaskTypeReducer);
     const {arrPriority} = useSelector(state => state.PriorityReducer);
     const {arrUser} = useSelector(state => state.UserLoginCyberBugsReducer);
     const userSearchOption = arrUser.map((user, index) => {
         return {value : user.userId , label: user.name}
     })

     const dispatch = useDispatch();
    const [size, setSize] = React.useState('default');

    const [timeTracking,setTimetracking] = useState({
        timeTrackingSpent:0,
        timeTrackingRemaining:0
    });
    //hook
    useEffect(() => {
        dispatch({type:GET_ALL_PROJECT_SAGA});
        dispatch({type:GET_ALL_TYPE_TASK_SAGA});
         dispatch({type:GET_ALL_PRIORITY_LIST_SAGA});
         dispatch({type: "GET_USER_API", keyword: ''})
         dispatch({
             type : "SET_SUBMIT_CREATE_PROJECT", 
             submitFunction : handleSubmit
        })
        dispatch({type: GET_ALL_STATUS_SAGA});
        // dispatch({
        //     type : GET_USER_BY_PROJECT_ID_SAGA
        // })
    },[])

    const handleEditorChange = (content, editor) => {
        setFieldValue("description", content)
    }

   

    const children = [];
    return (
        <div className="container">          
            <div className="form-group" onSubmit = {handleSubmit}>
                <p>Project</p>
                <select name="projectId" className="form-control" onChange =  {(e)=>{
                    let {value} = e.target;
                    setFieldValue("projectId", value); 
                    dispatch({
                    type : GET_USER_BY_PROJECT_ID_SAGA,
                    idProject: value
                })
                }} 
                value = {Number(values.projectId)} >
                   {arrProject.map((project,index)=>{
                       return <option key={index} value={Number(project.id)}>{project.projectName}</option>
                   })}
                </select>
            </div>
            <div className="form-group">
                <p>Task Name</p>
                <input type="text" name="taskName" className="form-control" value = {values.taskName}  onChange =  {handleChange} />
            </div>
            <div className="form-group">
                <p>Status</p>
                <select name="statusId" className="form-control" value = {values.statusId} onChange =  {handleChange} >
                {arrStatus.map((status,index)=>{
                       return <option key={index} value={Number(status.statusId)}>{status.statusName}</option>
                   })}
                </select>
            </div> 
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Priority</p>
                        <select name="priorityId" className="form-control" 
                        onChange =  {handleChange}
                        value = {values.priorityId}>
                            {arrPriority.map((priority,index)=>{
                                return <option key={index} value={priority.priorityId}>
                                    {priority.priority}
                                </option>
                            })}
                        </select>
                    </div>
                    <div className="col-6">
                        <p>Task type</p>
                        <select className="form-control" name="typeId" 
                        onChange =  {handleChange}
                        value = {values.typeId}>
                            {arrTaskType.map((taskType,index)=>{
                                return <option key={index} value={taskType.id}>{taskType.taskType}</option>
                            })}
                        </select>
                    </div>
                </div>
                
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                    <p>Assignees</p>
                    <Select
                            name = "assignees"
                            
                            mode="multiple"
                            size={size}
                            options={userSearchOption}
                            placeholder="Please select"
                            defaultValue={[]}
                            onChange={(values) => {
                                console.log(values)
                                setFieldValue("listUserAsign",values)
                            }}
                            onSearch = {(value) => {console.log(value)}}
                            optionFilterProp="label"
                            onSelect = {(value) => {console.log(value)}}
                            style={{ width: '100%' }}
                        > {children}
               
                    </Select>
                    <div className="row mt-3">
                        <div className="col-12">
                            <p>Original Estimate</p>
                            <input type="number" min="0" name="originalEstimate" defaultValue="0" className="form-control" height="30" onChange =  {handleChange}
                                value = {values.originalEstimate}
                            />
                        </div>
                    </div>
                    </div>
                    <div className="col-6">
                         <p>Time tracking</p>
                        <Slider defaultValue={30} 
                        name = "timeTracking"
                        value={timeTracking.timeTrackingSpent}
                         max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)}
                        />
                        <div className="row">
                            <div className="col-6 text-left font-weight-bold">{timeTracking.timeTrackingSpent}h logged</div>
                            <div className="col-6 text-right font-weight-bold">{timeTracking.timeTrackingRemaining}h remaining</div>
                        </div>
                        <div className="row" style={{marginTop:5}}>
                            <div className="col-6">
                                <p>Time spent</p>
                                <input type="number" defaultValue="0" min="0" 
                                className="form-control" name="timeTrackingSpent" 
                                value = {values.timeTrackingSpent}
                                onChange={(e)=>{
                                    setTimetracking({
                                        ...timeTracking,
                                        timeTrackingSpent:e.target.value
                                    })
                                setFieldValue("timeTrackingSpent", e.target.value)
                                }}/>
                            </div>

                            <div className="col-6">
                                <p>Time remaining</p>
                                <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingRemaining" 
                                value = {values.timeTrackingRemaining} 
                                onChange={(e)=>{
                                    setTimetracking({
                                        ...timeTracking,
                                        timeTrackingRemaining:e.target.value
                                    })
                                    setFieldValue("timeTrackingRemaining", e.target.value)
                                }}/>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div className="form-group">
                <p>Description</p>
                <Editor
                    name="description"
                    value = {values.description}
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
                        onEditorChange={handleEditorChange}
                />
            </div>
  
        </div>
    )
}
const createTaskForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        let {arrProject,arrStatus, arrTaskType, arrPriority} = props; 

        if(arrProject.length > 0) {
            console.log(arrProject[0]?.id);
            props.dispatch({
                type: GET_USER_BY_PROJECT_ID_SAGA, 
                idProject : arrProject[0]?.id
            })
        }
        return {
            taskName: '',
            description: '',
            statusId: arrStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent:0,
            timeTrackingRemaining:0,
            projectId:arrProject[0]?.id,
            typeId:arrTaskType[0]?.id,
            priorityId:arrPriority[0]?.priorityId,
            listUserAsign:[]
        }
    },
    validationSchema: Yup.object().shape({
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
       props.dispatch({
           type: "CREATE_TASK_SAGA",
           taskObject: values
       })
    },
})(FormCreateTask);

const mapStateToProps = (state) => ({ 
     arrProject : state.ProjectCyberBugsReducer.arrProject,
     arrStatus : state.StatusReducer.arrStatus,
     arrTaskType : state.TaskTypeReducer.arrTaskType,
     arrPriority : state.PriorityReducer.arrPriority
})
export default connect(mapStateToProps)(createTaskForm);

