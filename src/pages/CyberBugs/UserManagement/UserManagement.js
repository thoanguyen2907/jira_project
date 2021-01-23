import React, { useEffect } from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FormEditUser from '../../../components/Form/FormEditUser/FormEditUser';


export default function UserManagement() {
    const arrAllUser = useSelector(state => state.UserLoginCyberBugsReducer.arrAllUser);
    console.log("arrAllUser", arrAllUser);
    const dispatch = useDispatch(); 

    useEffect(()=>{
        dispatch ({
          type: "GET_ALL_USERS_SAGA"
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
        <h5>Create User</h5>
            <div className="d-flex">
                <input type="text" className="form-control" name="search" />
                <button type="button" className="btn btn-primary">Seach</button>
            </div>
               <Table columns={columns}  rowKey={"userId"} dataSource={arrAllUser} />
        </div>

    )
}
