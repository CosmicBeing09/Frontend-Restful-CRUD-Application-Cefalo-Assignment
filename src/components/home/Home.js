import React, { Component } from "react";
import Post from '../post/Post';
import swal from 'sweetalert';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Home extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            posts : [],
            pageSize : 5,
            totalData : 1
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.decrease = this.decrease.bind(this);
        this.increase = this.increase.bind(this);
    }

    decrease = () => {
        if(this.state.pageSize > 5){
        this.setState({ pageSize : this.state.pageSize - 1 });
        }
      }
    
      increase = () => {
        if(this.state.pageSize < 10)
        this.setState({ pageSize : this.state.pageSize + 1 });
      }

    componentDidMount(){
        fetch(`http://localhost:8080/posts?pageNo=0`+'&pageSize='+this.state.pageSize,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
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
                text: "Check your internet connection!!!",
                icon: "warning",
                button: "Ok",
              }).then(window.location.replace('/'));
        })

        fetch(`http://localhost:8080/posts/size`,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(res => res.json())
        .then(json => { 
            let totalData = json; 
            this.setState({totalData});
            console.log(totalData);
            
        }).catch(err => {
            swal({
                title: "Opppsss!",
                text: "No posts to show!!!",
                icon: "warning",
                button: "Ok",
              }).then(window.location.replace('/'));
        })
    }

    handleChange = (event,pageNo) => {
        var tempPageNo = pageNo - 1;
        fetch(`http://localhost:8080/posts?pageNo=`+tempPageNo+'&pageSize='+this.state.pageSize,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
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
                text: "Check your internet connection!!!",
                icon: "warning",
                button: "Ok",
              }).then(window.location.replace('/'));
        })
        
    }

    render(){
        const classes =  makeStyles(theme => ({
            root: {
              '& > *': {
                marginTop: theme.spacing(2),
              },
            },
          }));
        return(
            <div className="App"> 
            {
                this.state.posts.map(datum => 
                    <Post editPost={this.editPost}
                          deletePost = {this.deletePost}
                          post={datum} 
                          key={datum.id}
                          home = {true}
                          />
                    )
                }

         <Row>
         <Col style={{marginLeft : '600px'}}>    
         {/* <div style={{marginLeft : '600px',marginTop : '50px'}}> */}
         <Pagination count={Math.floor((this.state.totalData / this.state.pageSize)) + 1} color="secondary" onChange = {this.handleChange} />
         {/* </div> */}
         </Col>
         <Col>
         <div className="def-number-input number-input">
          <button onClick={this.decrease} className="minus"></button>
          <input className="quantity" name="quantity" value={this.state.pageSize} onChange={()=> console.log('change')}
          type="number" />
          <button onClick={this.increase} className="plus"></button>
        </div>
        </Col>
        </Row>
           </div>
        );
    }
}

export default Home;