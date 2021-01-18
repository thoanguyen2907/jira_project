import React, { Component } from 'react'
import { BrowserRouter, Route, Switch,Router } from 'react-router-dom';

import PageNotFound from './pages/NotFound/PageNotFound'; 
 
import Loading from './components/GlobalSetting/Loading';  
import UserLoginTemplate from './templates/HomeTemplate/UserLoginTemplate'; 
import LoginCyberBugs from './pages/CyberBugs/LoginCyberBug/LoginCyberBugs';
import {history} from './util/history/history'; 
import CyberbugsTemplate from './templates/HomeTemplate/CyberbugsTemplate';
import CreateProject from './pages/CyberBugs/CreateProject/CreateProject';
import ProjectManagement from './pages/CyberBugs/ProjectManagement/ProjectManagement';
import DrawerCyberbugs from './HOC/CyberbugsHOC/DrawerCyberbugs';
import IndexCyberBugs from './pages/CyberBugs/ProjectDetail/IndexCyberBugs';

export default class App extends Component {
  render() {
    return (
      <Router history = {history}>
<DrawerCyberbugs/>
      {/* <Modal/> */}
      <Loading/>
      <Switch>
      
  
        
        <UserLoginTemplate exact path="/login"  Component={LoginCyberBugs} />
            
        <CyberbugsTemplate exact path = "/cyberbugs" Component = {ProjectManagement}/>
        <CyberbugsTemplate exact path = "/createproject" Component = {CreateProject}/>
        <CyberbugsTemplate exact path = "/projectmanagement" Component = {ProjectManagement}/>
        <CyberbugsTemplate exact path = "/projectdetail/:projectId" Component = {IndexCyberBugs}/>
        <CyberbugsTemplate exact path="/"  Component={ProjectManagement} />
        <Route  path="*"  Component={PageNotFound} />      
      </Switch>

      </Router>
    )
  }
}
