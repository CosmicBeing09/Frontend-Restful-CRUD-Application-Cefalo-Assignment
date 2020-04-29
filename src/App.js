import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import SideDrawer from './nav/sideDrawer/SideDrawer';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import MyPost from './components/my_post/MyPost';
import EditPost from './components/edit_post/EditPost';
import CreatePost from './components/create_post/CreatePost';
import {I18Provider,LOCALES} from './i18n'; 

function App() {
  return (
    <I18Provider locale={LOCALES.NORWEGIAN}>
    <div className="App">
     <BrowserRouter>
     <SideDrawer/>
     <Switch>
       <Route exact path ="/" component={Home}/>
       <Route path ="/login" component={Login}/>
       <Route path ="/register" component={Register}/>
       <Route path = "/my-post" component={MyPost}/>
       <Route path = "/create-post" component={CreatePost}/>
       <Route path = "/edit-post" component={EditPost}/>
       <Route component={Home}/>
     </Switch>
     </BrowserRouter> 
    </div>
    </I18Provider>
  );
}

export default App;
