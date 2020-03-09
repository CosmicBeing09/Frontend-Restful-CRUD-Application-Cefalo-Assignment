import React, { Component } from "react";
import Post from '../post/Post';
import Container from '@material-ui/core/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
class Home extends Component{


    render(){
        return(
            <div className="App">
            
            {
            console.log(localStorage.getItem('userId')),
            console.log(localStorage.getItem('token'))
            
            }
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
           </div>
        );
    }
}

export default Home;