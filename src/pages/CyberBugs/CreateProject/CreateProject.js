import React, {useEffect} from 'react'; 
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import * as Yup from 'yup'; 
import {connect, useSelector, useDispatch} from 'react-redux'; 
import { CREATE_PROJECT_SAGA, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../../redux/constants/Cyberbugs/Cyberbugs';
 function CreateProject(props) {
   const   {arrayProjectCategory} = useSelector(state => state.ProjectCategoryReducer); 
    const dispatch = useDispatch(); 
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
      } = props

      useEffect(()=>{
        dispatch({
            type: GET_ALL_PROJECT_CATEGORY_SAGA
        })
      }, [])

   const handleEditorChange = (content, editor) => {
    setFieldValue("description", content)
      }
    
    return (
        <div className="container m-5">
            <h3 className="text-center"> Create Project</h3>
            <form className="container" onSubmit = {handleSubmit}>
                <div className="form-group">
                    <p>Name</p>
                    <input type="text" 
                    className="form-control" 
                    name="projectName"
                    onChange = {handleChange}
                    />
                </div>
                <div className="form-group">
                    <p>Description</p>
                    <Editor
            onEditorChange = {handleEditorChange}
         name="description"
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar:
             'undo redo | formatselect | bold italic backcolor | \ alignleft aligncenter alignright alignjustify | \  bullist numlist outdent indent | removeformat | help'
         }}
       />
                </div>
                <div className="form-group">
                    <select name="categoryId"  className="form-control"  onChange = {handleChange}>
                        {/* <option value="software" className="software">Software</option>
                        <option value="web" className="web">Web</option>
                        <option value="app" className="app">App</option> */}
                        {arrayProjectCategory.map((item, index)=>{
                            return  <option value={item.id} key={index}>{item.projectCategoryName}</option>
                        })}
                    </select>
                </div>
               
                <div className="text-center">
                <button type="submit" className="btn btn-primary">Create Project</button>
                </div>

            </form>
        </div>
    )
}
const createProjectForm = withFormik({
    enableReinitialize: true,//props thay đổi, thuộc tính tự động thay đổi và binding
    mapPropsToValues: (props) => {     
         return { projectName: "", description: "",  categoryId: props.arrayProjectCategory[0]?.id
        }},
   
    validationSchema: Yup.object().shape({
       
    }), 
    handleChange: e => {
        console.log(e.values);
    }, 
    handleSubmit: (values, {props,  setSubmitting }) => {       

        props.dispatch({
            type: CREATE_PROJECT_SAGA, 
            newProject: values
        })
    },
  
    displayName: 'Create Project Formik',
  })(CreateProject); 
  const mapStateToProps = (state) => {
      return {
          arrayProjectCategory: state.ProjectCategoryReducer.arrayProjectCategory
      }
  }
  export default connect(mapStateToProps) (createProjectForm); 
