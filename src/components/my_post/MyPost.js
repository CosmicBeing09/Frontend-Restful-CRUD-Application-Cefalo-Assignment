import React, { Component } from 'react';
import swal from 'sweetalert';
import Post from '../post/Post';

class MyPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts : []

        }
        this.editPost = this.editPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    deletePost = (postId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                
             fetch(`http://localhost:8080/post/`+postId, {
                    method: 'DELETE',
                    headers : {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                       'Authorization' : 'Bearer '+ localStorage.getItem('token')
                    }
                }).then(res => {  
                  if(res.status === 200){
                      swal({
                          title: "Done!",
                          text: "Story Deleted!!!",
                          icon: "success",
                          button: "Ok",
                        }).then(() => window.location.replace('/my-post'));
                  }
          
                  else{
                    swal({
                      title: "Opppsss!",
                      text: "Content Not found",
                      icon: "warning",
                      button: "Ok",
                    }).then();
                  }
                  }).catch(err => {
                  swal({
                    title: "Opppsss!",
                    text: "Check your internet conncetion",
                    icon: "warning",
                    button: "Ok",
                  }).then();
                });
            } else {
              swal("Post is not deleted!");
            }
          });
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
          }).then(() => window.location.replace('/'));
    })
    }

    render(){
        return(
            <div className="App">
                {
                this.state.posts.map(datum => 
                    <Post editPost={this.editPost}
                          deletePost = {this.deletePost}
                          post={datum} 
                          key={datum.id}
                          home = {false}
                          />
                    )
                }
            </div>
        );
    }
}
export default MyPost;