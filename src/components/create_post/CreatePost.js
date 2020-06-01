import React, { Component } from 'react';
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
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from './ImageUploadAdapter';
import DateTimePicker from 'react-datetime-picker';
import CheckBox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import translate from '../../i18n/translate';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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

class CreatePost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: null,
      body: null,
      token: null,
      userId: null,
      minDate: new Date(),
      publishDate: new Date(),
      draftChecked: false,
      tags: [],
      multiselectValue: [],
      alternateTags : [],
      editors : []
    };

    this.handleChange = this.handleChange.bind(this);
    this.postData = this.postData.bind(this);
  }

  async componentDidMount() {
    if (localStorage.getItem('token') === null) {
      swal({
        title: "Oppss!",
        text: "You are not logged in!!!",
        icon: "warning",
        button: "Ok",
      }).then(() => {
        window.location.replace('/login')
      });
    }
    else {
      await fetch(`${SERVER}` + `/posts/tags`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(res => res.json())
        .then(json => {
          let tags = json;
          this.setState({ tags });
        }).catch(err => {
          swal({
            title: "Opppsss!",
            text: "Seems like you are not logged in!!!",
            icon: "warning",
            button: "Ok",
          }).then(() => window.location.replace('/login'));
        })
    }
  }

  handleAlternateTags = event => {
    let value = event.target.value;
    let array = value.split(',');
    let finalArray = array.map(item => ({name : item.trim()}));
    this.setState({alternateTags : finalArray});
  }

  handleEditorChange = event => {
    let value = event.target.value;
    let array = value.split(',');
    let finalArray = array.map(item => item.trim());
    console.log(finalArray);
    this.setState({editors : finalArray});
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDateChange = date => {
    this.setState({ publishDate: date });
  }

  handleDraftCheckBoxChange = event => {
    this.setState(prevState => ({
      draftChecked: !prevState.draftChecked
    }));

  }


  async postData(event) {
    const data = {
      "title": this.state.title,
      "body": this.state.body,
      "publishDate": this.state.publishDate,
      "isPublished": false,
      "isDrafted": this.state.draftChecked,
      "existingTags": this.state.multiselectValue,
      "newTags" : this.state.alternateTags,
      "authorsId" : this.state.editors
    };

    await fetch(`${SERVER}` + `/post/` + localStorage.getItem('userId'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(data)
    }).then(res => {
      if (res.status === 201) {
        swal({
          title: "Bingoo!",
          text: "Story created!!!",
          icon: "success",
          button: "Ok",
        }).then(() => window.location.replace('/create-post'));
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
      formControl_: {
        margin: theme.spacing(3),
        minWidth: 220,
        maxWidth: 300,
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
      noLabel: {
        marginTop: theme.spacing(3),
      },
    }));

    return (
      <Container component="main" maxWidth="xs" style={{ marginTop: '80px' }}>
        <CssBaseline />
        <Card style={{ padding: '50px', width: '500px' }}>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5" style={{ color: '#790c5a' }}>
              {/* Create Story */}
              {translate('createStory')}
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <CKEditor
                    editor={ClassicEditor}
                    data='<p>Start here ...</p>'
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
                </Grid>
                <Grid item xs={12}> <div style={{ textAlign: 'left', marginLeft: '10px', marginBottom: '10px' }}>
                  <FormControl style={{ width: '220px' }}>
                    <InputLabel id="demo-mutiple-chip-label">{translate('selectTags')}</InputLabel>
                    <Select
                      labelId="demo-mutiple-chip-label"
                      name="multiselectValue"
                      id="demo-mutiple-chip"
                      multiple
                      value={this.state.multiselectValue}
                      onChange={this.handleChange}
                      input={<Input id="select-multiple-chip" />}
                      renderValue={(selected) => (
                        <div className={classes.chips}>
                          {selected.map((value) => (
                            <Chip key={value.id} label={value.name} className={classes.chip} />
                          ))}
                        </div>
                      )}
                    >
                      {this.state.tags.map((tag) => (
                        <MenuItem key={tag.id} value={tag}>
                          {tag.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ textAlign: "left", marginBottom: "10px" }}>
                    <Typography component="h1" style={{ color: '#790c5a' }}>
                       {translate('writeTags')}
                        </Typography>
                  </div>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="alternateTags"
                    label={translate('newTags')}
                    name="title"
                    autoComplete="alternateTags"
                    onChange={this.handleAlternateTags}
                  />
                </Grid>

                <Grid item xs={12}>
                  <div style={{ textAlign: "left", marginBottom: "10px" }}>
                    <Typography component="h1" style={{ color: '#790c5a' }}>
                    {translate('makeEditor')}
                        </Typography>
                  </div>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="editors"
                    label={translate('makeEditorLabel')}
                    name="editors"
                    autoComplete="editor"
                    onChange={this.handleEditorChange}
                  />
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
                  {/* Submit */}
                  {translate('submit')}
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
export default CreatePost;