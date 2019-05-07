import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    //Get data by post id
    componentDidUpdate () {
        if (this.props.id) {
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id) ) {
            axios.get('/posts/' + this.props.id)
                .then(response => {
                //   console.log(response);
                this.setState({loadedPost: response.data});
                });
            }     
        }   
    }

    //DELETE method
    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.id)
        .then(response => {
            console.log(response);
            console.log(alert('Post Deleted! For additional info look at Network & Console!'));
        });
    }

    render () {
        let post = <p style={{textAlign: 'center', color: 'blue', textTransform: 'uppercase'}}><strong>Please select a Post!</strong></p>;
        if (this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading...!</p>;
        }
        if (this.state.loadedPost) {
        post = (
            <div className="FullPost">
                <h1><strong>Title:</strong> {this.state.loadedPost.title}</h1>
                <p><strong>UserId:</strong> {this.state.loadedPost.userId}</p>
                <p><strong>PostId:</strong> {this.state.loadedPost.id}</p>
                <p><strong>Post Body:</strong> {this.state.loadedPost.body}</p>
                <div className="Edit">
                    <button 
                    className="Delete"
                    onClick={this.deletePostHandler}>Delete</button>
                </div>
            </div>

        );
      }  
        return post;
    }
}

export default FullPost;