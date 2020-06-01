import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import translate from '../../i18n/translate';

class Post extends Component {

    render() {
        var home = this.props.home;
        return (
            <Card style={{ margin: '20px', marginLeft: '300px', marginRight: '200px', marginTop: '24px', backgroundColor: '#eeeeee' }}>
                <Card.Header style={{ padding: '24px', backgroundColor: '#cccccc' }}><h5><b>{this.props.post.title}</b></h5></Card.Header>
                <Card.Body style={{ marginLeft: '100px', marginRight: '100px', padding: '32px' }}>
                    <blockquote className="blockquote mb-0">
                        <p style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: this.props.post.body }}>
                        </p>
                        <footer className="blockquote-footer" style={{textAlign : 'left', marginTop : '20px'}}>
                            Author: <cite title="Source Title">{this.props.post.user.name}</cite><br></br>
                            Published at : {this.props.post.date.split("T")[0]}
                            {this.props.post.authors.length > 0 ?
                                ( <div style={{marginLeft : '16px'}}>
                                    <Row>
                                    Editors:  
                                        {this.props.post.authors.map(author =>
                                            <div>
                                            <p style={{textIndent : '4px'}}>{author.userId},</p>    
                                            </div>
                                        )}
                                    </Row>
                                    </div>
                                ) : (<div></div>)}
                        </footer>
                    </blockquote>
                    {home ? (<div style={{ marginTop: '16px' }}>
                        <Link to={{ pathname: '/single-post', state: { id: this.props.post.id } }}>Continue reading ...</Link>
                    </div>) : (
                            <div>
                                <div style={{ marginTop: '7px' }}>
                                    {this.props.post.isDrafted ? (<div>Drafted</div>) : (<div></div>)}
                                    <div>
                                        {this.props.post.isPublished ? (<p>Published</p>) : (<p>Not Published</p>)}
                                    </div>
                                </div>
                                <Row>
                                    <Col xs lg="2"></Col>
                                    <Col xs lg="2"></Col>
                                    <Col xs lg="2">
                                        <Button style={{ marginTop: '20px' }} variant="primary" onClick={() => this.props.editPost(this.props.post.id)}> {translate('editPost')}</Button>
                                    </Col>

                                    <Col xs lg="2">
                                        <Button style={{ marginTop: '20px' }} variant="danger" onClick={() => this.props.deletePost(this.props.post.id)}> {translate('delete')}</Button>
                                    </Col>
                                </Row>
                            </div>
                        )}

                </Card.Body>
                <Card.Footer>
                    <Row style={{ textAlign: 'left', marginLeft: '100px', marginRight: '100px' }}>
                        {this.props.post.tags.map(tag =>
                            <div>
                                <Col key={tag.id}><p><Link to={{ pathname: '/tag-post/' + tag.name, state: { tagName: tag.name } }}>{tag.name}</Link> ,</p>
                                </Col>
                            </div>
                        )}
                    </Row>
                </Card.Footer>
            </Card>
        );
    }
}

export default Post;