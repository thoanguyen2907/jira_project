import { withFormik } from 'formik';
import React, { useEffect } from 'react';
import {  connect, useSelector,useDispatch } from 'react-redux';
import * as Yup from 'yup'; 
import { Input, Button } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { CREATE_A_USER, USER_SIGN_UP_SAGA } from '../../../redux/constants/Cyberbugs/Cyberbugs';
const FormCreateUser = (props) => {
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
        dispatch({ type: 'SET_SUBMIT_CREATE_A_USER', submitFunction: handleSubmit });
    }, []);

    return (
        <form style={{width: "80%"}} onSubmit = {handleSubmit}>
        <Input name="email" size="large" className="my-2" placeholder="email" prefix={<MailOutlined />} onChange={handleChange}

        />
        <div className="text-danger">{errors.email}</div>

        <Input.Password placeholder="password" size="large" className="my-2" name="passWord" onChange={handleChange}/>
        <div className="text-danger">{errors.passWord}</div>

        <Input name="phoneNumber" size="large" className="my-2" placeholder="phone number" onChange={handleChange} prefix={<PhoneOutlined />} />
        <div className="text-danger">{errors.phoneNumber}</div>

        <Input name="name" size="large" className="my-2" placeholder="name" onChange={handleChange} prefix={<UserOutlined />} />
        <div className="text-danger">{errors.name}</div>

       

   </form>
    );
}


const createUserForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
    
        return {
            email: '', 
            passWord: '',
            phoneNumber: '', 
            name : ''
        }
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email is not valid"),
        passWord: Yup.string().min(6, "password must be from 6 - 12 char").max(12, "password must be from 6 - 12 char"), 
        name:  Yup.string().required("Name is required"), 
        phoneNumber: Yup.number().required("Phone is required")
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
   
        props.dispatch({
            type: USER_SIGN_UP_SAGA,
            signUpData : values,
            actionType: CREATE_A_USER
        })
    },
})(FormCreateUser);

const mapStateToProps = (state) => ({
  
})
export default connect(mapStateToProps)(createUserForm);
