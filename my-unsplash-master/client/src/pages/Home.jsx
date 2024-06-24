import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import MasonryLayout from '../components/MasonryLayout';
import axios from 'axios';
import '../styles/home.css'
function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('https://unsplash-clone-server.vercel.app/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div className='home-wrapper'>
      <Navbar />
    <div className="home-container">
      <MasonryLayout posts={posts} />
    </div>
    <div className='footer'>
        created by <span id='username'>Navin kumar R </span>- devChallenges.io
      </div>
    </div>
  );
}

export default Home;
