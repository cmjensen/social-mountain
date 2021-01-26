import React, { Component } from 'react';
import axios from 'axios'
import Post from './Post/Post'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then( res => {
      console.log('Posts updating.')
      this.setState({
        posts: res.data
      })
    }).catch( err => {
      console.log('Posts not updating.')
    })
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts/${id}/${text}`)
    .then( res => {
      console.log(`Posts being added.`)
      this.setState({
        posts: res.data
      })
    }).catch( err => {
      console.log('Posts are not being added.')
    })
  }

  deletePost(id, text) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts/${id}/${text}`)
    .then( res => {
      console.log('Posts are being deleted.')
      this.setState({
        posts: res.data
      })
    }).catch( err => {
      console.log(`Posts are not being deleted.`)
    })
  }

  createPost( text ) {
    axios.post(`https://practiceapi.devmountain.com/api/posts/${text}`)
    .then( res=> {
      console.log('Posts are being created.')
      this.setState({
        posts: res.data
      })
    }).catch( err => {
      console.log('Posts are not being created.')
    })
  }

  render() {
    const { posts, updatePost, deletePost, createPost } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose />

          {
            posts.map( post => (
                <Post 
                key={ post.id }
                text={ post.text }
                date={ post.date }
                updatePostFn={ updatePost }
                id={ post.id }
                deletePostFn={ deletePost }
                createPostFn={ createPost }/>
            ))
          }

        </section>
      </div>
    );
  }
}

export default App;
