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
import { SERVER } from '../../config/config';
import DateTimePicker from 'react-datetime-picker';
import CheckBox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from '../create_post/ImageUploadAdapter';
import translate from '../../i18n/translate';

function MinHeightPlugin(editor) {
  this.editor = editor;
}

MinHeightPlugin.prototype.init = function () {
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
  .create(document.querySelector('#editor1'))
  .then(editor => {
    // console.log( editor );
  })
  .catch(error => {
    console.error(error);
  });


class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      isLoading: true,
      title: null,
      body: "start here!",
      minDate: new Date(),
      publishDate: new Date(),
      draftChecked: false
    }
    this.postData = this.postData.bind(this);
  }


  async componentDidMount() {

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
          var title = post.title;
          var body = post.body;
          this.setState({ title });
          this.setState({ body });
         // this.setState({publishDate : post.publishDate});
          this.setState({draftChecked : post.isDrafted});

        }).catch(err => {
          swal({
            title: "Opppsss!",
            text: "Something went wrong. Please log in again!!!",
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
    this.setState({ isLoading: false });

  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDraftCheckBoxChange = event => {
    this.setState(prevState => ({
      draftChecked: !prevState.draftChecked
    }));

  }

  async postData(event) {
    const data = {
      "id": this.props.location.state.id,
      "title": this.state.title,
      "body": this.state.body,
      "publishDate": this.state.publishDate,
      "isPublished": false,
      "isDrafted" : this.state.draftChecked
    };

    await fetch(`${SERVER}` + `/post`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(data)
    }).then(res => {
      if (res.status === 200) {
        swal({
          title: "Bingoo!",
          text: "Story Updated Successfully!!!",
          icon: "success",
          button: "Ok",
        }).then(() => window.location.replace('/my-post'));
      }

      else {
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

  render() {
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
      formControl: {
        margin: theme.spacing(3),
      },
    }));
    if (this.state.isLoading) {
      return (<div>Loading ....</div>);
    }
    else {
      return (
        <Container component="main" maxWidth="xs" style={{ marginTop: '80px' }}>
          <CssBaseline />
          <Card style={{ padding: '50px', width: '500px' }}>
            <div className={classes.paper}>
              <Typography component="h1" variant="h5" style={{ color: '#790c5a' }}>
                {/* Edit Story */}
                {translate('editStory')}
              </Typography>

              <form className={classes.form} noValidate style={{ marginTop: '30px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="title"
                      label={translate('title')}
                      name="title"
                      autoComplete="title"
                      onChange={this.handleChange}
                      defaultValue={this.state.title}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <CKEditor
                    editor={ClassicEditor}
                    data={this.state.body}
                    onInit={editor => {
                      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                        return new MyUploadAdapter(loader, `${SERVER}` + `/uploadFile`);
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
                      cols={55}
                      rowsMin={10}
                      aria-label="Body"
                      placeholder="Write Post Here"
                      id="body"
                      name="body"
                      onChange={this.handleChange}
                      defaultValue={this.state.body}
                    /> */}
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormControlLabel
                        control={<CheckBox
                          name="draftChecked"
                          checked={this.state.draftChecked}
                          onChange={this.handleDraftCheckBoxChange}
                        />}
                        label={translate('saveAsDraft')}
                      />
                    </FormControl>
                  </Grid>
                  {this.state.draftChecked ? (<div></div>
                  ) : (
                      <Grid item xs={8}>
                        <div style={{ textAlign: "left", marginBottom: "10px" }}>
                          <Typography component="h1" style={{ color: '#790c5a' }}>
                            {/* Select a date to publish */}
                            {translate('selectDate')}
                       </Typography>
                        </div>
                        <DateTimePicker
                          onChange={this.handleDateChange}
                          value={this.state.publishDate}
                          minDate={this.state.minDate}
                          format="yyyy-MM-dd hh:mm:ss a"
                        >
                        </DateTimePicker>
                      </Grid>)}
                </Grid>
                <div style={{ padding: "50px" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={this.postData}
                  >
                    {/* Update */}
                    {translate('update')}
                </Button>
                </div>
              </form>
            </div>
            <Box mt={5}>
            </Box>
          </Card>
        </Container>
      );
    }
  }
}
export default EditPost;