import React, {useState, useEffect} from 'react';
import {Route} from 'react-router-dom';
import { Button, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

export default function UserLoginTemplate(propsRoute) {

    const [{width,height }, setSize] = useState({width: window.innerWidth,height:window.innerHeight });
    useEffect(()=>{
        window.onresize = () =>{
            setSize({
                width: window.innerWidth, 
                height: window.innerHeight, 
            })
        }
    }, [])

    let {Component, ...resRoute} = propsRoute; 
    return <Route {...resRoute} render = {(propsRoute) => {
        return <>
        <Layout>
            <Sider width={width/2} style={{height:height,backgroundImage:'url(https://picsum.photos/2000)',backgroundSize:'100%'}}>
                sider
            </Sider>
            <Content>
            <Component {...propsRoute}/>
            </Content>
        </Layout>
           
        </>
    }} />
}
