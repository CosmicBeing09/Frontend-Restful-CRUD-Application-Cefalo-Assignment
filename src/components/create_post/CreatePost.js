import React, { Component } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import swal from 'sweetalert';
import Card from 'react-bootstrap/Card';
import {SERVER} from '../../config/config';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from './ImageUploadAdapter';


function MinHeightPlugin(editor) {
  this.editor = editor;
}

MinHeightPlugin.prototype.init = function() {
  this.editor.ui.view.editable.extendTemplate({
    attributes: {
      style: {
        minHeight: '300px'
      }
    }
  });
};
ClassicEditor.builtinPlugins.push(MinHeightPlugin);
ClassicEditor
  .create( document.querySelector( '#editor1' ) )
  .then( editor => {
    // console.log( editor );
  })
  .catch( error => {
    console.error( error );
  });

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
       if(localStorage.getItem('token') === null)
       swal({
        title: "Oppss!",
        text: "You are not logged in!!!",
        icon: "warning",
        button: "Ok",
      }).then(() => { 
        window.location.replace('/login')});
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });    
      }

      async postData(event) {
        const data = {
            "title" : this.state.title,
            "body" : this.state.body
        };

      await fetch(`${SERVER}`+`/post/`+localStorage.getItem('userId'), {
          method: 'POST',
          headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
             'Authorization' : 'Bearer '+ localStorage.getItem('token')
          },
          body: JSON.stringify(data)
      }).then(res => {  
        if(res.status === 201){
            swal({
                title: "Bingoo!",
                text: "Story created!!!",
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
            <Card style={{padding:'50px',width : '500px'}}>
            <div className={classes.paper}>
              <Typography component="h1" variant="h5" style={{color:'#790c5a'}}>
                Create Story
              </Typography>
             
              <form className={classes.form} noValidate  style={{marginTop:'30px'}}>
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
                  <CKEditor
                    editor={ClassicEditor}
                    data="<p>Start here...!</p>"
                    onInit={editor => {
                        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                            return new MyUploadAdapter(loader, `${SERVER}`+`/uploadFile`);
                        };
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const body = editor.getData();
                        this.setState({ body });
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
                  {/* <TextareaAutosize
                  cols = {55}
                  rowsMin = {10}
                  aria-label="Body" 
                  placeholder="Write Your Story Here"
                  id = "body"
                  name = "body"
                  onChange = {this.handleChange} 
                  /> */}
                  </Grid>
                  <Grid item xs={12}>
                  </Grid>
                </Grid>
                
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick = {this.postData}
                >
                  Submit
                </Button>
              </form>
            </div>
            <Box mt={5}>
            </Box>
            </Card>
          </Container>
        );
    }
}
export default CreatePost;