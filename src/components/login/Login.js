import React, { Component } from "react";
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
import Card from 'react-bootstrap/Card';
import {SERVER} from '../../config/config';

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            userId : null,
            password : null,
            isLoading : true,
            status : null
        };

        this.handleChange = this.handleChange.bind(this);
        this.postData = this.postData.bind(this);
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });    
      }

      async postData(event) {

        const data = {
            "userId" : this.state.userId,
            "password" : this.state.password
        };


      await fetch(`${SERVER}`+`/user/authenticate`, {
          method: 'POST',
          headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          body: JSON.stringify(data)
      }).then(res => {
        if(res.status === 200){
            this.setState({loader : false});
            swal({
                title: "Bingoo!",
                text: "Login successful!!!",
                icon: "success",
                button: "Ok",
              }).then(() => {
                localStorage.setItem('userId',this.state.userId); 
                window.location.replace('/')});
        }

        else{
          swal({
            title: "Opppsss!",
            text: "Login failed",
            icon: "warning",
            button: "Ok",
          }).then(() => {
             window.location.replace('/login')
          });
        }
        return res.json();
        }).then(data => {
          if(data.token !== undefined){
          localStorage.setItem('token',data.token); 
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
            <Container component="main" maxWidth="xs" style={{marginTop:'100px'}}>
            <CssBaseline />
            <Card style={{padding:'50px'}}>
            <div className={classes.paper}>
              <Typography component="h1" variant="h5" style={{color:'#790c5a'}}>
                Sign In
              </Typography>
             
              <form className={classes.form} noValidate style={{marginTop:'30px'}}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="userId"
                      label="UserId"
                      name="userId"
                      autoComplete="userId"
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  </Grid>
                </Grid>
                
                <Button
                style={{marginTop:'20px'}}
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick = {this.postData}
                >
                  Sign In
                </Button >
                <Grid container style={{marginLeft:'50px'}}>
                  <Grid item style={{marginTop:'30px'}}>
                    <Link href="/register" variant="body2" >
                      Don't have an account? Register
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={5}>
            </Box>
            </Card>
          </Container>
        );
    }
}

export default Login;