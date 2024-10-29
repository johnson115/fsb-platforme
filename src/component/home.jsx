import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../postServices';
import Post from './post';

import "./home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

 

  if (loading) return <p className='loading-message'>Loading...</p>;

  return (
    <div>
      
      {posts.length === 0 ? (
        <p className='no-posts-message'>No posts exist yet</p>
      ) : (
        posts.map(post => (
          <Post key={post._id} name={post.name} content={post.content} timestamp={post.timestamp} />
        ))
      )}
    </div>
  );
};

export default Home;