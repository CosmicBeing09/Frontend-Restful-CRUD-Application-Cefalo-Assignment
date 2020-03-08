import React, { Component } from "react";

class Post extends Component{
    

    render(){
        return(
            <div>
                <p>Post</p>
                {console.log("Post rendered")
                }
            </div>
        );
    }
}

export default Post;