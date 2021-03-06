import React, { Component } from "react";
import Post from '../post/Post';
import swal from 'sweetalert';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditorsPost.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SERVER } from '../../config/config';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import translate from '../../i18n/translate';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { connect } from 'react-redux';

class EditorsPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            searchText: null,
            pageSize: 5,
            totalData: 1,
            tempPageNo: 0

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.decrease = this.decrease.bind(this);
        this.increase = this.increase.bind(this);
    }

    decrease = () => {
        if (this.state.pageSize > 5) {
            this.setState({ pageSize: this.state.pageSize - 1 });
        }
    }

    increase = () => {
        if (this.state.pageSize < 10)
            this.setState({ pageSize: this.state.pageSize + 1 });
    }

    componentDidMount() {
        fetch(`${SERVER}` + `/posts/editor-post/`+localStorage.getItem('userId')+`?pageNo=0` + '&pageSize=' + this.state.pageSize, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '+localStorage.getItem('token')
            }
        })
            .then(res => {
                return res.json()
            })
            .then(json => {
                let posts = json;
                this.setState({ posts });
                console.log(posts);

            }).catch(err => {
                swal({
                    title: "Opppsss!",
                    text: "Check your internet connection!!!",
                    icon: "warning",
                    button: "Ok",
                }).then(window.location.replace('/'));
            })

        fetch(`${SERVER}` + `/posts/size`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                let totalData = json;
                this.setState({ totalData });
                console.log(totalData);

            }).catch(err => {
                swal({
                    title: "Opppsss!",
                    text: "No posts to show!!!",
                    icon: "warning",
                    button: "Ok",
                }).then();
            })
    }

    handleSearchBarChange = event => {
        this.setState({ [event.target.name]: event.target.value });

    }

    editPost = (postId) => {
        console.log(postId);
       this.props.history.push({
           pathname : '/edit-post',
           state : {id : postId,
                    page : "editorPage"}
        });
    }

    deletePost = (postId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                
             fetch(`${SERVER}`+`/post/`+postId, {
                    method: 'DELETE',
                    headers : {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                       'Authorization' : 'Bearer '+ localStorage.getItem('token')
                    }
                }).then(res => {  
                  if(res.status === 200){
                      swal({
                          title: "Done!",
                          text: "Story Deleted!!!",
                          icon: "success",
                          button: "Ok",
                        }).then(() => window.location.replace('/editors-post'));
                  }
          
                  else{
                    swal({
                      title: "Opppsss!",
                      text: "Content Not found",
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
            } else {
              swal("Post is not deleted!");
            }
          });
    }

    async handleChange(event, pageNo) {
        var tempPageNo = pageNo - 1;

        if (this.state.searchText === null || this.state.searchText === "") {
            this.setState({ searchText: null });
            fetch(`${SERVER}` + `/posts/editor-post/`+localStorage.getItem('userId')+`?pageNo=` + tempPageNo + '&pageSize=' + this.state.pageSize, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
                .then(res => res.json())
                .then(json => {
                    let posts = json;
                    this.setState({ posts });
                    console.log(posts);

                }).catch(err => {
                    swal({
                        title: "Opppsss!",
                        text: "Check your internet connection!!!",
                        icon: "warning",
                        button: "Ok",
                    }).then(window.location.replace('/'));
                });
        }
        else {
            this.search(event, tempPageNo);
        }
    }

    render() {
        const classes = makeStyles(theme => ({
            root: {
                '& > *': {
                    marginTop: theme.spacing(2),
                },
            },
        }));
        return (
            <div className="App">

                <div style={{ minHeight: '480px' }}>
                    {
                        this.state.posts.map(datum =>
                            <Post editPost={this.editPost}
                                deletePost={this.deletePost}
                                post={datum}
                                key={datum.id}
                                home={false}
                            />
                        )
                    }
                </div>
                <Row>
                    <Col style={{ marginLeft: '700px' }}>
                        <Pagination count={Math.floor((this.state.totalData / this.state.pageSize)) + 1} color="secondary" onChange={this.handleChange} />
                    </Col>
                    <Col>
                        <div className="def-number-input number-input">

                            <button onClick={this.decrease} className="minus"></button>
                            <input className="quantity" name="quantity" value={this.state.pageSize} onChange={() => console.log('change')}
                                type="number" />
                            <button onClick={this.increase} className="plus"></button>
                        </div>
                    </Col>
                </Row>

            </div>
        );
    }
}


export default EditorsPost;