import React, { useState, useEffect } from 'react';
import Post from '../component/post';
import { fetchPosts } from '../postServices';
import { CircularProgress, Typography, Box } from '@mui/material';
import girlUser from '../img/girluser.jpg';
import userImage from '../img/user.jpg';
import adminimg from "../img/admin.png";
import { BadgeCheck } from 'lucide-react';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        setError('Error while fetching posts');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (posts.length === 0) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <Typography variant="h6" color="white" className='success-message'>
          No posts available. Be the first to create a post!
        </Typography>
      </Box>
    );
  }
  
  return (
    <div className='main-home'>
      <div style={{
      backgroundColor: 'var(--secondary-color)',
      borderRadius: '8px',
      border: '1px solid blue',
      padding: '16px',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      maxWidth: '600px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '12px',
      }}>
        <img
          src={adminimg}
          alt="admin post"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            marginRight: '12px',
          }}
        />
        <span style={{
          fontWeight: 'bold',
          color: 'var(--main-color)',
          display:'flex', alignItems:'center',
        }}>
          Admin <BadgeCheck size={22} color='#FFB6C1 ' fill='blue' style={{marginLeft:'7px'}} />
        </span>
      </div>
      <div style={{
        color: 'white',
        lineHeight: '1.5',
        marginBottom: '16px',
        
      }}>
        <h3>🌟 Welcome to the FSB University Anonymous Post App! 🌟</h3>

Hey everyone!

We’re excited to share our new app with you! It’s a safe and anonymous space where you can share your thoughts, ask questions, and connect with others at FSB University. Whether you want to vent, seek advice, or drop a hint to a crush, this is the place for you!
<br /> 
<details>
<summary style={{fontWeight:'bold', marginTop:'10px' , textDecoration:'underline' , cursor:'pointer'}}>✨ What This App Is For:</summary>
 <br />
<ul>
   <li>
Anonymity: Share your thoughts , idea & feelings without fear.</li>
 <li> Making Friends: Connect with others who share your interests.</li>
 
 <li> Event Sharing: Clubs can post their events so everyone knows what’s happening.</li>
 
</ul>
<span style={{fontWeight:'700', marginTop:'10px' }}>🔍 How to Use the App:</span>
<ol>
<li>
Use the menu at the top to find different features.</li>
 <li> Click “Create Post” to share your thoughts.</li>
 <li> Check out what others are saying and leave comments.</li>
 <li> We’d love to hear your feedback! Let us know how we can make this app better for you.</li>
 </ol>

 <a href='https://discord.gg/7RjMy9dN' target='_blank' style={{fontWeight:'bold' , color:"blue", fontSize:"17px" , cursor:'pointer' }}>Click here to join Our Discord server 🔽</a>

 <h5 style={{textAlign:'center' }}>Let’s make FSB University a more connected place!</h5>


Happy posting! 🎉
      
      </details>
      </div>
      <span style={{
          fontSize: '0.8em',
          color: 'var(--main-color)',
        }}>
          11/1/2024 00:00 
        </span>
      </div>
       
      {posts.map(post => (
        <Post
          key={post._id}
          _id={post._id}
          profileImg={post.gender ==="male" ? userImage : girlUser}
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