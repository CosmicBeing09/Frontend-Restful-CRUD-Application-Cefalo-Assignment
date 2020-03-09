import React, { Component } from 'react';
import swal from 'sweetalert';
import Post from '../post/Post';
class MyPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts : []
        }
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
                    <Post post={datum} key={datum.id}/>
                    )
                }
            </div>
        );
    }
}
export default MyPost;