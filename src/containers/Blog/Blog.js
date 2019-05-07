import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios'; // adding from axios.js - const instance config

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    //GET request for Posts
    componentDidMount() {
        axios.get('/posts')
        .then(response => {
            const posts = response.data.slice(0, 6);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Milan'
                }
            });
            this.setState({posts: updatedPosts});
            // console.log(response);
        })
        .catch(error => {
            this.setState({error: true});
        });
    }

    //Get id for selected post
    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    //[Handling Error Locally] in posts from catch which targets state
    render () {
        let posts = <p style={{textAlign: 'center', color: 'red'}}><strong>Something went wrong!</strong></p>;
        if (!this.state.error) {
            posts = this.state.posts.map((post) => {
                return <Post 
                key={post.id} 
                title={post.title} 
                author={post.author}
                clicked={()=> this.postSelectedHandler(post.id)}
                />
            });
        }       
        
        return (
            <div>
                <section className="Posts">
                   {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;