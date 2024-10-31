import React, { useState, useEffect } from 'react';
import Post from '../component/post';
import { fetchPosts } from '../postServices';


const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    loadPosts();
  }, []);

  return (
    <div>
      {posts.map(post => (
        <Post
          key={post._id}
          _id={post._id}
          profileImg={post.profileImg}
          name={post.name}
          content={post.content}
          timestamp={post.timestamp}
          initialLoveCount={post.loveCount || 0}
          initialComments={post.comments || []}
        />
      ))}
    </div>
  );
};

export default Home;