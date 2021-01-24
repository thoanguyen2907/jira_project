import React, { useEffect } from 'react'; 
import { withFormik } from 'formik';
import * as Yup from 'yup'
import { connect, useSelector, useDispatch } from 'react-redux'; 

function FormEditUser(props) {
    const {userEditInfo} = useSelector(state => state.UserLoginCyberBugsReducer); 

    const dispatch = useDispatch()

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

    useEffect(() => {
        dispatch({ type: 'SET_SUBMIT_EDIT_USER_INFO', submitFunction: handleSubmit });
    }, []);
    return (
        <form className="form-group" onSubmit = {handleSubmit}>
           <div className="form-group">
                        <p className="font-weight-bold">User id</p>
                        <input type="number" name="id" className="form-control my-3" value={values.id} 
                        onChange = {handleChange}
                        disabled/>
            </div>
            <div className="form-group">
                        <p className="font-weight-bold">Password</p>
                        <input type="passWord" name="passWord" className="form-control my-3" value={values.passWord} 
                        onChange = {handleChange}/>
            </div>
            <div className="form-group">
                        <p className="font-weight-bold">Phone number</p>
                        <input type="number" name="phoneNumber" className="form-control my-3" value={values.phoneNumber} 
                        onChange = {handleChange} />
            </div>
            <div className="form-group">
                        <p className="font-weight-bold">User Name</p>                     
                         <input type="text" name="name" className="form-control my-3" 
                           onChange = {handleChange}
                         value={values.name} />
                    </div>
        
             
        </form>
    )
}
const editUserInfoForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const {userEditInfo} = props; 
        return {
            id:userEditInfo.userId ,
            name: userEditInfo.name, 
            passWord:'' , 
            phoneNumber: ''
        }
    },
    validationSchema: Yup.object().shape({
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
        type: "EDIT_USER_INFO_SAGA", 
        userInfo: values
    })
    },
})(FormEditUser);

const mapStateToProps = (state) => ({
    userEditInfo : state.UserLoginCyberBugsReducer.userEditInfo ,
})
export default connect(mapStateToProps)(editUserInfoForm);
