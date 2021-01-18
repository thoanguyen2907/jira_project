import React from 'react';
import { withFormik } from 'formik';
import { Input, Button } from 'antd';
import { UserOutlined , FacebookOutlined, TwitterOutlined} from '@ant-design/icons';
import * as Yup from 'yup'; 
import {connect} from 'react-redux';
import { USER_SIGNIN_API } from '../../../redux/constants/Cyberbugs/Cyberbugs';
import { siginCyberbugsAction } from '../../../redux/actions/CyberBugsAction';
 function LoginCyberBugs(props) {

     const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
    return (
        <form onSubmit = {handleSubmit} className="container">
            <div className="d-flex justify-content-center align-items-center"
                style={{ height: "100vh" }}>
                <div className="form__group" style={{ width: "100%" }}>
                    <h3 className="text-center">{props.displayName}</h3>
                    <div style={{ width: "50%" }} className="mx-auto text-center">
                        <Input onChange={handleChange} size="large" className="my-2"  name="email"
                        type="email" 
                        placeholder="email" prefix={<UserOutlined />} />
                         <div className="text-danger">{errors.email}</div>
                    
                        <Input.Password onChange={handleChange} className="my-2"  name="password" 
                        type="password"
                        placeholder="password" />
                          <div className="text-danger">{errors.password}</div>
                        <Button htmlType="submit" type="primary" className="my-3">Primary Button</Button>
                        <div className="social">
                    <Button type="primary" className="my-3" icon={ <FacebookOutlined />}></Button>
                    <Button type="primary" className="my-3" icon={ <TwitterOutlined />}></Button>
                    
                    </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

const LoginCyberBugsWithFormik = withFormik({
    mapPropsToValues: () => ({ email: '', password: '' }),
   
    validationSchema: Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email is not valid"),
        password: Yup.string().min(6, "password must be from 6 - 32 char").max(32, "password must be from 6 - 32 char")
    }),  
    handleSubmit: ({email, password}, {props,  setSubmitting }) => {       
        props.dispatch(siginCyberbugsAction(email,password, props.history )); 
    },
  })(LoginCyberBugs); 

  export default connect() (LoginCyberBugsWithFormik); 