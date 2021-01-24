import React from 'react';
import { withFormik } from 'formik';
import { Input, Button } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import * as Yup from 'yup'; 
import {connect} from 'react-redux';

 function SignupCyberBug(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: "100%", width: "100%"}}>
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

             <div className="text-center my-3">
             <button className="btn btn-primary mx-2"  type="submit">Sign up</button>
             <button className="btn btn-default mx-2" type="button">Register</button>
             </div>

        </form>
        </div>

    )
}
const SignupCyberBugsWithFormik = withFormik({
    mapPropsToValues: () => ({ 
        email: '', 
        passWord: '',
        phoneNumber: '', 
        name : ''
     }),
   
    validationSchema: Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email is not valid"),
        passWord: Yup.string().min(6, "password must be from 6 - 12 char").max(12, "password must be from 6 - 12 char"), 
        name:  Yup.string().required("Name is required"), 
        phoneNumber: Yup.number().required("Phone is required")

    }),  
    handleSubmit: (values, {props,  setSubmitting }) => {       

        props.dispatch({
            type: "USER_SIGN_UP_SAGA",
            signUpData : values,
       
        })
    },
  })(SignupCyberBug); 

  export default connect() (SignupCyberBugsWithFormik); 
