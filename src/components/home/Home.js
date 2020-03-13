import React, { Component } from "react";
import Post from '../post/Post';
import swal from 'sweetalert';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SERVER } from '../../config/config';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            searchText : null,
            pageSize: 5,
            totalData: 1,
            tempPageNo : 0

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.search = this.search.bind(this);
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
        fetch(`${SERVER}` + `/posts?pageNo=0` + '&pageSize=' + this.state.pageSize, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(res => {
                //  localStorage.setItem('ETag',res.headers.get('ETag'));  
                console.log(res.status);

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

     async handleChange (event, pageNo){

        
        var tempPageNo = pageNo - 1;     

        if(this.state.searchText === null || this.state.searchText === ""){
            this.setState({searchText : null});
        fetch(`${SERVER}` + `/posts?pageNo=` + tempPageNo + '&pageSize=' + this.state.pageSize, {
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
        else{
            this.search(event,tempPageNo);
        }
    }

    async search(event,pageNo){
        
        console.log(pageNo);

        if(pageNo === undefined){
            pageNo = 0;
        }
         
         fetch(`${SERVER}` + `/posts/search?pageNo=`+ pageNo 
                                + '&pageSize=' + this.state.pageSize
                                + '&text=' + this.state.searchText, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then(res => res.json())
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
            }).then();
        });  
    };  

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

                <div style={{ padding: '20px' }}>
                    <Row>
                        <Col xs="4"></Col>
                        <Col md="auto">
                            <TextField 
                                id="standard-secondary"
                                name = "searchText"
                                label="Search Story"
                                color="secondary"
                                onChange = {this.handleSearchBarChange}
                            />
                        </Col>
                        <Col md="auto">
                            <IconButton 
                            className={classes.iconButton} 
                            aria-label="search"
                            onClick = {this.search}
                            >
                                <SearchIcon />
                            </IconButton>
                        </Col>
                    </Row>
                </div>

                {
                    this.state.posts.map(datum =>
                        <Post editPost={this.editPost}
                            deletePost={this.deletePost}
                            post={datum}
                            key={datum.id}
                            home={true}
                        />
                    )
                }

                <Row>
                    <Col style={{ marginLeft: '600px' }}>
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

export default Home;