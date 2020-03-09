import React, { Component } from "react";
import Card from 'react-bootstrap/Card'

class Post extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card style={{margin:'20px',marginLeft:'100px',marginRight:'50px'}}>
                <Card.Header>{this.props.post.title}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>

                           {this.props.post.body}
                        </p>
                        <footer className="blockquote-footer">
                            Author: <cite title="Source Title">{this.props.post.user.name}</cite><br></br>
                            Published at : {this.props.post.date}
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>
        );
    }
}

export default Post;