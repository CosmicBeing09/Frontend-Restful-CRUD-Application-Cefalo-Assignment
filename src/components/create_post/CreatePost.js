import React, { Component } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import swal from 'sweetalert';

class CreatePost extends Component{

    constructor(props){
        super(props);
        this.state = {
            title : null,
            body : null,
            token : null,
            userId : null
        };

        this.handleChange = this.handleChange.bind(this);
        this.postData = this.postData.bind(this);
    }

    componentDidMount(){
        var token = localStorage.getItem('token');
        var userId = localStorage.getItem('userId');

        this.setState({token});
        this.setState({userId});
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });    
      }

      async postData(event) {
        const data = {
            "title" : this.state.title,
            "body" : this.state.body
        };


      await fetch(`http://localhost:8080/post/`+localStorage.getItem('userId'), {
          method: 'POST',
          headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
             'Authorization' : 'Bearer '+ localStorage.getItem('token')
          },
          body: JSON.stringify(data)
      }).then(res => {  
        if(res.status == 201){
            swal({
                title: "Bingoo!",
                text: "Login successful!!!",
                icon: "success",
                button: "Ok",
              }).then(() => window.location.replace('/create-post'));
        }

        else{
          swal({
            title: "Opppsss!",
            text: "Fill up the field correctly",
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

    render(){
        const classes = makeStyles(theme => ({
            paper: {
              marginTop: theme.spacing(8),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            },
            avatar: {
              margin: theme.spacing(1),
              backgroundColor: theme.palette.secondary.main,
            },
            form: {
              width: '100%', // Fix IE 11 issue.
              marginTop: theme.spacing(3),
            },
            submit: {
              margin: theme.spacing(3, 0, 2),
            },
          }));

        return(
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Create Post
              </Typography>
             
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="title"
                      label="title"
                      name="title"
                      autoComplete="title"
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <TextareaAutosize
                  cols = {48}
                  rowsMin = {10}
                  aria-label="Body" 
                  placeholder="Write Post Here"
                  id = "body"
                  name = "body"
                  onChange = {this.handleChange} 
                  />
                  </Grid>
                  <Grid item xs={12}>
                  </Grid>
                </Grid>
                
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick = {this.postData}
                >
                  Submit
                </Button>
              </form>
            </div>
            <Box mt={5}>
            </Box>
          </Container>
        );
    }
}
export default CreatePost;