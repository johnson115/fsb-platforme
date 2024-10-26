import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import userImage from '../img/user.jpg'; // Adjust the path if necessary

const Post = ({ profileImg, name, content }) => {
  const [loveCount, setLoveCount] = useState(0);

  const handleLoveClick = () => {
    setLoveCount(prevCount => prevCount + 1);
  };

  return (
    <div style={{
      backgroundColor: 'var(--secondary-color)',
      borderRadius: '8px',
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
          src={profileImg || userImage} // Use the imported image here
          alt={`${name}'s profile`}
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
        }}>
          {name}
        </span>
      </div>
      <p style={{
        color: 'white',
        lineHeight: '1.5',
        marginBottom: '16px',
      }}>
        {content}
      </p>
      <button
        onClick={handleLoveClick}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          color: 'var(--main-color)',
          fontWeight: 'bold',
        }}
      >
        <Heart
          size={20}
          style={{
            marginRight: '4px',
            fill: loveCount > 0 ? 'var(--main-color)' : 'none',
          }}
        />
        {loveCount}
      </button>
    </div>
  );
};

// Example usage of the Post component
const PostExample = () => {
  return (
    <Post
      profileImg={userImage} // Use the imported image here
      name="John Doe"
      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    />
  );
};

export default PostExample;
