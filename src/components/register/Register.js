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
import translate from '../../i18n/translate';

class Register extends Component{
   
    constructor(props){
        super(props);
        this.state = {
            userId : null,
            name : null,
            password : null
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
              "name" : this.state.name,
              "password" : this.state.password
          };


        await fetch(`${SERVER}`+`/user/register`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => {console.log(res.status);
            if(res.status === 201){
                this.setState({loader : false});
                swal({
                    title: "Bingoo!",
                    text: "Registration Successful!!!",
                    icon: "success",
                    button: "Ok",
                  }).then(next => {
                      window.location.replace('/login');
                  });
            }
            else if(res.status === 400){
              this.setState({loader : false});
              swal({
                  title: "Opppsss!",
                  text: "Username already taken",
                  icon: "warning",
                  button: "Try again",
                }).then();
            }
            else{
              swal({
                title: "Opppsss!",
                text: "Fill the form correctly",
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
              width: '100%',
              marginTop: theme.spacing(3),
            },
            submit: {
              margin: theme.spacing(3, 0, 2),
            },
          }));

        return(
            <Container component="main" maxWidth="xs" style={{marginTop:'80px'}}>
            <CssBaseline />
            <Card style={{padding:'50px'}}>
            <div className={classes.paper}>
              <Typography component="h1" variant="h5"  style={{color:'#790c5a'}}>
                {/* Sign up */}
                {translate('signUp')}
              </Typography>
             
              <form className={classes.form} noValidate style={{marginTop:'30px'}}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="userId"
                      label={translate('userId')}
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
                      id="name"
                      label={translate('name')}
                      name="name"
                      autoComplete="name"
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label={translate('password')}
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
                  {/* Sign Up */}
                  {translate('signUp')}
                </Button>
                <Grid style={{marginTop:'20px'}}>
                  <Grid item style={{marginTop:'30px'}}>
                    <Link href="/login" variant="body2">
                      {/* Already have an account? Sign in */}
                      {translate('loginURL')}
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

export default Register;