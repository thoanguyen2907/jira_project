import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FormEditUser from '../../../components/Form/FormEditUser/FormEditUser';
import { USER_LOGIN } from '../../../util/constants/settingSystem';
import FormCreateUser from '../../../components/Form/FormCreateUser/FormCreateUser';


export default function UserManagement() {
    const arrAllUser = useSelector(state => state.UserLoginCyberBugsReducer.arrAllUser);
    const [keyWord, setKeyWord] = useState('');
    const dispatch = useDispatch(); 
    let userLoginInFo = {}; 
    if(localStorage.getItem(USER_LOGIN)){
      userLoginInFo = JSON.parse(localStorage.getItem(USER_LOGIN)); 
  }
  
    useEffect(()=>{
        dispatch ({
          type: "GET_ALL_USERS_SAGA", 
          keyword : ''
        })
    }, [])

    const columns = [

        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'UserId',
          dataIndex: 'userId',
          key: 'userId',
        },
        {
          title: 'Avatar',
          key: 'avatar',
          dataIndex: 'avatar',
          render: (text, record, index) => (
            <>
              {<img src={record.avatar} alt = {record.avatar} key={index} style={{width: "30px", height:"30px"}}></img>}
            </>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <Button style={{color: "#9254de"}} onClick={() => {
                dispatch({
                  type: "OPEN_FORM_EDIT_USER_INFO",
                   title: "Edit User Info Form", 
                   Component : <FormEditUser/>,  
                })

                dispatch({
                  type: "USER_EDIT_INFO_REDUCER", 
                  userEditInfo : record
                })

              }}
              >Edit</Button>
              <Button style={{color: "#eb2f96"}} onClick = {()=>{
                dispatch({
                  type: "DELETE_USER_FROM_LIST_SAGA", 
                  userId : record.userId
                })
              }}
              >Delete</Button>
            </Space>
          ),
        },
      ];
         
    return (
        <div className="container-fluid mt-5">
        <div className="container-fluid justify-content-end d-flex">
          <h5 className="mx-3"> Hello {userLoginInFo.name} </h5>
          <img src={userLoginInFo.avatar} alt={userLoginInFo.name} style={{width: "30px", height: "30px", borderRadius:"50%"}}/>
        </div>
        <button className="btn btn-primary my-4"
        onClick = {() => {
          dispatch({
            type: "OPEN_FORM_CREATE_USER", 
            Component : <FormCreateUser/>, 
           title : "Create a new user form"
          })
          
        }}
        >Create User</button>
            <div className="d-flex  justify-content-between align-items-center">
                <input type="text" className="form-control" name="search" style={{width: "80%"}} value={keyWord} 
                onChange= {(e) => {
                  let {value} = e.target; 
                  setKeyWord(value)
                }} />
                <button type="button" className="btn btn-primary" onClick = {()=>{
                  dispatch({
                    type: "GET_ALL_USERS_SAGA", 
                    keyword : keyWord
                  })
                }}
                >Search</button>
                  <button type="button" className="btn btn-primary" onClick = {()=>{
                  dispatch({
                    type: "GET_ALL_USERS_SAGA", 
                    keyword : ''
                  })
                  setKeyWord('')
                }}
                >Reset</button>
            </div>
               <Table columns={columns}  rowKey={"userId"} dataSource={arrAllUser} />
        </div>

    )
}
