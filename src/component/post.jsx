import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import userImage from '../img/user.jpg'; // Adjust the path if necessary

const Post = ({ profileImg, name, content, timestamp, initialLoveCount = 0 }) => {
  const [loveCount, setLoveCount] = useState(initialLoveCount);
  const [isLoved, setIsLoved] = useState(false);

  const handleLoveClick = () => {
    setLoveCount(prevCount => prevCount + 1);
    setIsLoved(true);
  };

  return (
    <div style={{
      backgroundColor: 'var(--secondary-color)',
      borderRadius: '8px',
      border: '1px solid #343434' ,
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
          src={profileImg || userImage}
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
            color: 'var(--main-color)',
            fontWeight: 'bold',
          }}
        >
          <Heart
            size={20}
            style={{
              marginRight: '4px',
              fill: isLoved ? 'var(--main-color)' : 'none',
              stroke: 'var(--main-color)',
            }}
          />
          {loveCount}
        </button>
        <span style={{
          fontSize: '0.8em',
          color: 'var(--main-color)',
        }}>
          {new Date(timestamp).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default Post;