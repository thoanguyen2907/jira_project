import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import * as Yup from 'yup'
import { connect, useSelector, useDispatch } from 'react-redux'
import ProjectCategoryReducer from '../../../redux/reducers/ProjectCategoryReducer';
import { GET_ALL_PROJECT_CATEGORY_SAGA } from '../../../redux/constants/Cyberbugs/Cyberbugs';


 function FormEditProject(props) {
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

    const dispatch = useDispatch();

    
    //componentdidmount
    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_CATEGORY_SAGA
        })
        dispatch({ type: 'SET_SUBMIT_EDIT_PROJECT', submitFunction: handleSubmit });
    }, [])

    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }

    const   {arrayProjectCategory} = useSelector(state => state.ProjectCategoryReducer); 

    return (
        <form className="container-fuild" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project id</p>
                        <input disabled  className="form-control" name="id" />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project name</p>
                        <input className="form-control"                        
                        onChange={handleChange}
                         value={values.projectName} 
                         name="projectName" />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project Category</p>
                        <select className="form-control" 
                        value={values.categoryId} onChange={handleChange}
                        name="categoryId"
                        >
                            {arrayProjectCategory.map((item, index)=>{
                                return <option key={index} value={item.id}>{item.projectCategoryName}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p className="font-weight-bold">Description</p>
                        <Editor
                            value={values.description}
                            initialValue = {values.description}
                            name="description"
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
            </div>
        </form>
    )
}
const editProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const {projectEdit} = props; 
        return {
            id: projectEdit?.id,
            projectName:projectEdit.projectName ,
            categoryId: projectEdit?.categoryId, 
            description: projectEdit.description

        }
    },
    validationSchema: Yup.object().shape({
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({ 
            type: 'EDIT_PROJECT_SAGA',
            newProject: values 
        })
        const action = {
            type: "UPDATE_PROJECT_SAGA", 
            projectUpdate : values
        }
        props.dispatch(action)
    },
})(FormEditProject);

const mapStateToProps = (state) => ({
projectEdit : state.ProjectEditReducer.projectEdit , 
arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory

})
export default connect(mapStateToProps)(editProjectForm);
