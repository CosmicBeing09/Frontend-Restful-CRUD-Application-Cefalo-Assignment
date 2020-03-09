import React, { Component } from "react";
import Post from '../post/Post';

class Home extends Component{


    render(){
        return(
            <div>
            
            {console.log(localStorage.getItem('token'))
            }
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <div>Login page</div>
            </div>
        );
    }
}

export default Home;