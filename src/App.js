import React from 'react';
import logo from './logo.svg';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import SideDrawer from './nav/sideDrawer/SideDrawer';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';

function App() {
  return (
    
    <div className="App">
     
     <BrowserRouter>
     <SideDrawer/>
     <Switch>
       <Route exact path ="/" component={Home}/>
       <Route path ="/login" component={Login}/>
       <Route path ="/register" component={Register}/>
     </Switch>
     </BrowserRouter>
     
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

    </div>
  );
}

export default App;
