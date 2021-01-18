import React, {useEffect, useState} from 'react'; 
import { Table, Button, Space, Tag, Popconfirm, Popover, AutoComplete } from 'antd';
import { Avatar, Image } from 'antd';
import ReactHtmlParser from 'react-html-parser';
import { DeleteOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import FormEditProject from '../../../components/Form/FormEditProject/FormEditProject';
import { NavLink } from 'react-router-dom'; 
import { ADD_USER_PROJECT_API, DELETE_PROJECT_SAGA, DELETE_USER_PROJECT_API, EDIT_PROJECT_SAGA_DRAWER, GET_LIST_PROJECT_SAGA, GET_USER_API, OPEN_FORM_EDIT_PROJECT } from '../../../redux/constants/Cyberbugs/Cyberbugs';
export default function ProjectManagement(props) {
    const dispatch = useDispatch(); 
    
    //lấy dữ liệu từ reducer về component 
    const projectList = useSelector(state => state.ProjectCyberBugsReducer.projectList); 
    const userSearch = useSelector(state => state.UserLoginCyberBugsReducer.userSearch); 
    const [value, setValue] = useState("");
    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });
    useEffect(()=>{
        dispatch({
            type: GET_LIST_PROJECT_SAGA
        })
    }, [])
   const handleChange = (pagination, filters, sorter) => {
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };
  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };
  let { sortedInfo, filteredInfo } = state;

    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        sorter: (item2, item1) => {
            return item2.id - item1.id; 
        },
        sortDirections: ['descend'], 
        ellipsis: true,
      },
      {
        title: 'projectName',
        dataIndex: 'projectName',
        key: 'projectName',
        render: (text, record, index)=>{
            return <NavLink key = {index} to = {`/projectdetail/${record.id}`}>{text}</NavLink>
        },
        sorter: (item2, item1) => {
           let projectName1 = item1.projectName?.trim().toLowerCase(); 
           let projectName2 = item2.projectName?.trim().toLowerCase(); 
           if(projectName2 < projectName1){
               return -1 
           } 
           return 1; 
        },
        sortDirections: ['descend'], 
        ellipsis: true,
      },
     
      {
        title: 'creator',
        key: 'creator',
        render: (text, record, index) => {
            return <Tag>{record.creator?.name}</Tag> 
        },
        ellipsis: true,
      },
      {
        title: 'members',
        key: 'members',
        render: (text, record, index) => {
            return  <div>
            {record.members?.slice(0,3).map((item, index)=>{
                return (
                  <Popover key={index} placement="top" title="members" content={()=>{
                    return <table className="table">
                      <thead>
                        <tr>
                          <td>Id</td>
                          <td>Avatar</td>
                          <td>Name</td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        {record.members?.map((item, index)=>{
                          return <tr key={index}>
                            <td>{item.userId}</td>
                            <td> <img src={item.avatar} alt="avatar" width="30" height="30" /> </td>
                            <td>{item.userId}</td>
                            <td> <button className="btn btn-danger" style={{borderRadius: "50%"}} 
                            onClick={()=> {dispatch({
                              type: DELETE_USER_PROJECT_API,
                              userProject: {
                                "projectId": record.id,
                                "userId": item.userId
                              }})}}> X </button> </td>
                          </tr>
                        })}
                      </tbody>
                      </table>

                  }}>
                   <Avatar src={item.avatar} key={index}/>
                   </Popover>
                )
                })}
               
               {record.members?.length> 3?<Avatar>...</Avatar> : ""} 
              <Popover placement="topLeft" title={"Add user"} content={()=>{return <div> <AutoComplete 
              style={{width: "100%"}}  
              onSearch={(value)=>{dispatch({type: GET_USER_API, keyword: value})}}
              options={userSearch?.map((user,index)=>{
                return {label: user.name, value: user.userId.toString() }
              })}
              value={value}
              onChange = {(value)=>{setValue(value)}}
              onSelect={(valueSelect, option)=>{
                setValue(option.label); 
                dispatch({
                  type: ADD_USER_PROJECT_API, 
                  userProject: {
                    "projectId": record.id,
                    "userId": valueSelect
                  }
                })
              }}
              /></div>}} trigger="click">
              <Button>+</Button>
            </Popover>
            </div>
        },
        ellipsis: true,
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, record, index) => {
          return <div>
          <Space size="middle">
               <EditOutlined style={{ color: '#08c' }}
               onClick = {()=>{
                 const action= {
                   type: OPEN_FORM_EDIT_PROJECT,
                   title: "Edit Project Form", 
                   Component : <FormEditProject/>,                   
                 }
                 //dispatch lên reducer nội dung drawer 
                 dispatch(action); 
                 const actionEditProject = {
                   type: EDIT_PROJECT_SAGA_DRAWER, 
                   projectEditModal: record 
                 }
                 dispatch(actionEditProject)
               }}
                />
                 <Popconfirm
    title="Are you sure to delete this task?"
    onConfirm={()=>{dispatch({type: DELETE_PROJECT_SAGA, id: record.id})}} >
   <DeleteOutlined style={{ color: '#eb2f96' }} />
  </Popconfirm>,
               
            </Space>
          </div>

        },
        ellipsis: true,
      },
    ]  
    return (
        <div className="container-fluid mt-5">
         <h3> Project Management</h3>
        <Space style={{ marginBottom: 16 }}>
          <Button onClick={setAgeSort}>Sort age</Button>
          <Button onClick={clearFilters}>Clear filters</Button>
          <Button onClick={clearAll}>Clear filters and sorters</Button>
        </Space>
        <Table columns={columns} rowKey={"id"} dataSource={projectList} onChange={handleChange} />
      </div>
    )
}
