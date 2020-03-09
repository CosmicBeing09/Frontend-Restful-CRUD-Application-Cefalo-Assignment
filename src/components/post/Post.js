import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
                    <Row>
                     <Col md="auto" style={{marginLeft:'550px'}}>   
                    <Button style={{marginTop:'20px'}} variant="primary" onClick = {() => this.props.editPost(this.props.post.id)}>Edit Post</Button>
                    </Col>
                    <Col md="auto"></Col>
                    <Col md="auto">
                    <Button style={{marginTop:'20px'}} variant="danger" onClick = {() => this.props.deletePost(this.props.post.id)}>Delete</Button>
                    </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}

export default Post;