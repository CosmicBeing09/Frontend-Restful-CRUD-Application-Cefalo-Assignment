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
import SinglePost from './components/single_post/SinglePost';
import TagPost from './components/tag_posts/TagPost';
import MostCommented from './components/most_commented/MostCommented';
import EditorsPost from './components/editors_post/EditorsPost';
import {I18Provider,LOCALES} from './i18n'; 
import {connect} from 'react-redux';

function App(props) {
  return (
    
    <div className="App">
      <I18Provider locale={props.lang}>
    {console.log('App: '  + props.lang)
    }
     <BrowserRouter>
     <SideDrawer/>
     <Switch>
       <Route exact path ="/" component={Home}/>
       <Route path ="/login" component={Login}/>
       <Route path ="/register" component={Register}/>
       <Route path = "/my-post" component={MyPost}/>
       <Route path = "/create-post" component={CreatePost}/>
       <Route path = "/edit-post" component={EditPost}/>
       <Route path = "/single-post" component={SinglePost}/>
       <Route path = "/tag-post" component={TagPost}/>
       <Route path = "/most-commented" component={MostCommented}/>
       <Route path = "/editors-post" component={EditorsPost}/>
       <Route component={Home}/>
     </Switch>
     </BrowserRouter> 
     </I18Provider>
    </div>
   
  );
}
const mapStateToProps = state => {
  return {
    lang : state.language
  };
}

export default connect(mapStateToProps)(App);
