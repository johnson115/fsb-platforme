import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../postServices';
import Post from './post';
import "./home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    loadPosts();
  }, []);

  if (loading) return <p className='loading-message'>Loading...</p>;
  if (posts.length === 0) return <p className='no-posts-message'>No posts exist yet</p>;

  return (
    <div>
      {posts.map(post => (
        <Post
          key={post._id}
          profileImg={post.profileImg}
          name={post.name}
          content={post.content}
          timestamp={post.timestamp}
          initialLoveCount={post.loveCount || 0}
        />
      ))}
    </div>
  );
};

export default Home;