import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import userImage from '../img/user.jpg'; // Adjust the path if necessary

const Post = ({ name, content, timestamp }) => {
  const [loveCount, setLoveCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false); // State to track if post is liked

  const handleLoveClick = () => {
    if (isLiked) {
      setLoveCount(prevCount => prevCount - 1); // Decrease count if already liked
    } else {
      setLoveCount(prevCount => prevCount + 1); // Increase count if not liked
    }
    setIsLiked(prev => !prev); // Toggle the like status
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{
      backgroundColor: 'var(--secondary-color)',
      borderRadius: '8px',
      border: '1px solid #343434',
      padding: '16px',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      maxWidth: '600px',
      cursor: 'pointer',
      userSelect: "none",
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '12px',
      }}>
        <img
          src={userImage}
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
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <button
          onClick={handleLoveClick}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            color: '#FFB6C1', // Change color based on like status
            fontWeight: 'bold',
          }}
        >
          <Heart size={20} style={{ fill: isLiked ? '#FFB6C1' : 'none' }} /> {/* Change fill color */}
          <span style={{ marginLeft: '5px' }}>{loveCount}</span>
        </button>
        <span style={{
          fontSize: '12px',
          color: '#888',
        }}>
          {formatDate(timestamp)}
        </span>
      </div>
    </div>
  );
};

export default Post;
