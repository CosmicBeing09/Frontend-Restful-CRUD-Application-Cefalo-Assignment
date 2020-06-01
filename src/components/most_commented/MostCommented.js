import React, { Component } from "react";
import Post from '../post/Post';
import swal from 'sweetalert';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MostCommented.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SERVER } from '../../config/config';

class MostCommented extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            searchText: null,
            pageSize: 5,
            totalData: 1,
            tempPageNo: 0

        }
    }


    componentDidMount() {
        fetch(`${SERVER}` + `/posts/mostCommented?count=5`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(res => { 
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

                <div style={{ minHeight: '540px' }}>
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
                </div>
            </div>
        );
    }
}

export default MostCommented;