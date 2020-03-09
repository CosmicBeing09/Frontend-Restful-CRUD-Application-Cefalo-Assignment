import React, { Component } from 'react';
import swal from 'sweetalert';
import Post from '../post/Post';
import {Redirect} from 'react-router-dom';

class MyPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts : []

        }
        this.editPost = this.editPost.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    editPost = (postId) => {
        console.log(postId);
       this.props.history.push({
           pathname : '/edit-post',
           state : {id : postId}
        });
    }

   async componentDidMount(){
    await fetch(`http://localhost:8080/user-posts/`+localStorage.getItem('userId'),{
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : 'Bearer '+localStorage.getItem('token')
        }
    })
    .then(res => res.json())
    .then(json => { 
        let posts = json; 
        this.setState({posts});
        console.log(posts);
        
    }).catch(err => {
        swal({
            title: "Opppsss!",
            text: "Seems like you are not logged in!!!",
            icon: "warning",
            button: "Ok",
          }).then(window.location.replace('/'));
    })
    }

    render(){
        return(
            <div className="App">
                {
                this.state.posts.map(datum => 
                    <Post editPost={this.editPost} post={datum} key={datum.id}/>
                    )
                }
            </div>
        );
    }
}
export default MyPost;