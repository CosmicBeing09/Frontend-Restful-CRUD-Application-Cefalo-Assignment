import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import translate from '../../i18n/translate';
import {SERVER} from '../../config/config';
import swal from 'sweetalert';
import { Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ScrollTopToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';
import InputField from '../input_field/InputField';
import Eye from '@material-ui/icons/RemoveRedEye';

class SinglePost extends Component{
    constructor(props){
        super(props);
        this.state = {
            post : null,
            isLoading : true,
            comment : "",
            count : 0
        };
    }

    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = event => {
     fetch(`${SERVER}` + `/post/comment?userId=` + localStorage.getItem('userId')+`&postId=`+this.state.post.id, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: this.state.comment
    }).then(res => {
      if (res.status === 201) {
        swal({
          title: "Bingo!",
          text: "Comment posted!!!",
          icon: "success",
          button: "Ok",
        }).then(() => {
          this.setState({comment : ""});
          window.location.reload();
        });
      }

      else {
        swal({
          title: "Opppsss!",
          text: "Failed",
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
}
    async componentDidMount(){
        try {
            await fetch(`${SERVER}` + `/post/` + this.props.location.state.id, {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              }
            })
              .then(res => res.json())
              .then(json => {
                let post = json;
                this.setState({post});
              }).catch(err => {
                swal({
                  title: "Opppsss!",
                  text: "You are not logged in!!!",
                  icon: "warning",
                  button: "Ok",
                }).then(window.location.replace('/login'));
              })
          } catch (error) {
            swal({
              title: "Oppsss!",
              text: "You are not logged in!!!",
              icon: "warning",
              button: "Ok",
            }).then(() => {
              window.location.replace('/login')
            });
          }

          await fetch(`${SERVER}` + `/post/view/`+this.props.location.state.id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }).then(res => {
            if (res.status === 200) {
              return res.json();
            }
            else{
              console.log("Error: post increment error");
            }
          }).then(json => this.setState({count : json})).catch(err => {
            console.log("Error: post increment error");
          });

          this.setState({ isLoading: false });
    }

    render(){
      const ROOT_CSS = css({
        height: 420,
        marginTop: 32
    });
        if (this.state.isLoading) {
            return (<div>Loading ....</div>);
          }
        else {  
        return(
            <div className="App">
                 <Card style={{ margin: '20px', marginLeft: '300px', marginRight: '200px',marginTop:'24px', backgroundColor:'#eeeeee' }}>
                <Card.Header style={{padding : '24px',backgroundColor:'#cccccc'}}><h5><b>{this.state.post.title}</b></h5></Card.Header>
                <Card.Body style={{marginLeft:'100px',marginRight:'100px', padding:'32px'}}>
                  <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col><Eye/> <span> {this.state.count} </span> </Col>
                  </Row>
                    <blockquote className="blockquote mb-0">
                        <p style={{textAlign : 'left'}} dangerouslySetInnerHTML={{ __html: this.state.post.body }}>
                        </p>
                        <footer className="blockquote-footer" style={{textAlign : 'left', marginTop : '20px'}}>
                            Author: <cite title="Source Title">{this.state.post.user.name}</cite><br></br>
                            Published at : {this.state.post.date.split("T")[0]}
                            {this.state.post.authors.length > 0 ?
                                ( <div style={{marginLeft : '16px'}}>
                                    <Row>
                                    Editors:  
                                        {this.state.post.authors.map(author =>
                                            <div>
                                            <p style={{textIndent : '4px'}}>{author.userId},</p>    
                                            </div>
                                        )}
                                    </Row>
                                    </div>
                                ) : (<div></div>)}
                        </footer>
                    </blockquote>
                </Card.Body>
                <Card.Footer>
                    <Row style={{textAlign : 'left',marginLeft : '100px',marginRight : '100px'}}>
                    {this.state.post.tags.map(tag => 
                    <div>
                        <Col key={tag.id}><p><Link to={{ pathname: '/tag-post/'+tag.name, state : {tagName : tag.name} }}>{tag.name}</Link> ,</p>
                        </Col>
                        </div>
                        )}
                    </Row>
                </Card.Footer>
            </Card>
            <div>
              <Card style={{ margin: '20px', marginLeft: '300px', marginRight: '200px',marginTop:'24px', backgroundColor:'#eeeeee' }}>
                <Card>
                <Card.Header>
                <Typography component="h1" style={{ color: '#790c5a',textAlign : 'left',marginLeft : '10px' }}>
                 Comments: 
                </Typography>
                </Card.Header>
                <Card.Body>
                <ScrollTopToBottom className={ROOT_CSS}>
                  {this.state.post.comments.map(comment => 
                    <div style={{marginTop:'10px'}}>
                      <Card key={comment.id}>
                        <Card.Header style={{textAlign : 'left'}}>
                          {comment.user.userId}
                        </Card.Header>
                        <Card.Body style={{textAlign : 'left'}}>
                          {comment.text}
                        </Card.Body>
                      </Card>
                    </div>
                    )}
                    </ScrollTopToBottom>
                </Card.Body>
                </Card>
                <InputField onChange={this.onChange} onSubmit={this.onSubmit} value={this.state.comment} />
              </Card>
            </div>
            </div>
        );
     }
    }
}
export default SinglePost;