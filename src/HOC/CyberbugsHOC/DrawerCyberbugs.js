import React, { useState } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import DrawerCyberbugsReducer from '../../redux/reducers/DrawerCyberbugsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_DRAWER, OPEN_DRAWER } from '../../redux/constants/Cyberbugs/Cyberbugs';


const DrawerCyberbugs = (props) => {
  // let  [state, setState] = useState({
  //   visible: true,
  // });
  const dispatch =  useDispatch(); 

  const {visible, ComponentDrawerContent, callBackSubmit, title} = useSelector(state => state.DrawerCyberbugsReducer); 
  const showDrawer = () => {
    dispatch({
      type: OPEN_DRAWER, 
    })
  };
 
  const  onClose = () => {
    dispatch({
      type: CLOSE_DRAWER
    })
  };

    return (
        <>    
        <Drawer
          title={title}
          width={720}
          onClose={onClose}
          visible = {visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={callBackSubmit} type="primary">
                Submit
              </Button>
            </div>
          }
        >
    {ComponentDrawerContent}
        </Drawer>
      </>
    );
  }



export default DrawerCyberbugs;
