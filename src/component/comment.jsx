import React from 'react';
import defaultUserImage from '../img/user.png';

const Comment = ({ content, timestamp, name = "Unknown", profileImg = defaultUserImage }) => {
  return (
    <div style={{
      backgroundColor: 'var(--secondary-color)',
      borderRadius: '4px',
      padding: '8px',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'flex-start',
    }}>
      <img
        src={profileImg}
        alt={`${name}'s profile`}
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          marginRight: '8px',
        }}
      />
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '4px',
        }}>
          <span style={{
            fontWeight: 'bold',
            color: 'var(--main-color)',
            fontSize: '0.9em',
            marginRight: '8px',
          }}>
            {name}
          </span>
          <span style={{
            fontSize: '0.7em',
            color: 'var(--main-color)',
          }}>
            {new Date(timestamp).toLocaleString()}
          </span>
        </div>
        <p style={{
          color: 'white',
          fontSize: '0.9em',
          margin: 0,
        }}>
          {content}
        </p>
      </div>
    </div>
  );
};

export default Comment;