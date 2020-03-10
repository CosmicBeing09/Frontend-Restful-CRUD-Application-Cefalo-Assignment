import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class Post extends Component {

    render() {
        var home = this.props.home;
        return (
            <Card style={{ margin: '20px', marginLeft: '300px', marginRight: '200px',marginTop:'24px' }}>
                <Card.Header style={{padding : '24px',backgroundColor:'#beebe9'}}><h5><b>{this.props.post.title}</b></h5></Card.Header>
                <Card.Body style={{marginLeft:'100px',marginRight:'100px', padding:'32px'}}>
                    <blockquote className="blockquote mb-0">
                        <p style={{textAlign : 'left'}}>

                            {this.props.post.body}
                        </p>
                        <footer className="blockquote-footer">
                            Author: <cite title="Source Title">{this.props.post.user.name}</cite><br></br>
                            Published at : {this.props.post.date.split("T")[0]}
                        </footer>
                    </blockquote>
                    {home ? (<div></div>) : (
                        <Row>
                        <Col md="auto" style={{ marginLeft: '320px' }}>
                            <Button style={{ marginTop: '20px' }} variant="primary" onClick={() => this.props.editPost(this.props.post.id)}>Edit Post</Button>
                        </Col>
                        <Col md="auto"></Col>
                        <Col md="auto">
                            <Button style={{ marginTop: '20px' }} variant="danger" onClick={() => this.props.deletePost(this.props.post.id)}>Delete</Button>
                        </Col>
                    </Row>
                    )}

                </Card.Body>
            </Card>
        );
    }
}

export default Post;