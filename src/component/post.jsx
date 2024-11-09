import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle } from 'lucide-react';

import defaultUserImage from '../img/images.jpg';

import { toggleLovePost, addComment } from '../postServices';
import Comment from './comment';

const Post = ({ _id, profileImg, name, content, timestamp, initialLoveCount = 0, initialComments = [] }) => {
  const [loveCount, setLoveCount] = useState(initialLoveCount);
  const [isLoved, setIsLoved] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    const lovedPosts = JSON.parse(localStorage.getItem('lovedPosts') || '{}');
    setIsLoved(!!lovedPosts[_id]);
  }, [_id]);

  const handleLoveClick = async () => {
    if (isUpdating) return;
  
    try {
      setIsUpdating(true);
      const action = isLoved ? 'unlike' : 'like';
      const updatedPost = await toggleLovePost(_id, action);
  
      setLoveCount(updatedPost.loveCount);
      setIsLoved(!isLoved);
  
      const lovedPosts = JSON.parse(localStorage.getItem('lovedPosts') || '{}');
      if (!isLoved) {
        lovedPosts[_id] = true;
      } else {
        delete lovedPosts[_id];
      }
      localStorage.setItem('lovedPosts', JSON.stringify(lovedPosts));
    } catch (error) {
      console.error('Error updating love status:', error);
    } finally {
      setIsUpdating(false);
    }
  };
  

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmittingComment) return;

    try {
      setIsSubmittingComment(true);
      setCommentError('');
      console.log('Submitting comment:', newComment, 'for post:', _id);

      const addedComment = await addComment(_id, newComment.trim());
      console.log('Comment added successfully:', addedComment);

      setComments(prevComments => [...prevComments, addedComment]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      setCommentError('Failed to add comment. Please try again.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--secondary-color)',
      borderRadius: '8px',
      border:'1px solid #707070',
      
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
          src={profileImg}
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
        marginBottom: '12px',
      }}>
        <button
          onClick={handleLoveClick}
          disabled={isUpdating}
          style={{
            background: 'none',
            border: 'none',
            cursor: isUpdating ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--main-color)',
            fontWeight: 'bold',
            opacity: isUpdating ? 0.7 : 1,
          }}
        >
          <Heart
            size={20}
            style={{
              marginRight: '4px',
              fill: isLoved ? 'var(--main-color)' : 'none',
              stroke: 'var(--main-color)',
              transition: 'fill 0.2s ease',
            }}
          />
          {loveCount}
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
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
          <MessageCircle size={20} style={{ marginRight: '4px' }} />
          {comments.length}
        </button>
        <span style={{
          fontSize: '0.8em',
          color: 'var(--main-color)',
        }}>
          {new Date(timestamp).toLocaleString()}
        </span>
      </div>
      {showComments && (
        <div>
          {comments.map((comment, index) => (
            <Comment 
              key={index} 
              content={comment.content} 
              timestamp={comment.timestamp}
              name="Unknown"
              profileImg={defaultUserImage}
            />
          ))}
          <form onSubmit={handleCommentSubmit} style={{ marginTop: '12px' }}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              disabled={isSubmittingComment}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #343434',
                backgroundColor: 'var(--secondary-color)',
                color: 'white',
                marginBottom: '8px',
                fontSize:'16px',
              }}
            />
            {commentError && (
              <p style={{ color: '#ff4444', fontSize: '0.875rem', marginBottom: '8px' }}>
                {commentError}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmittingComment || !newComment.trim()}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: 'var(--main-color)',
                color: 'white',
                cursor: isSubmittingComment ? 'wait' : 'pointer',
                opacity: isSubmittingComment || !newComment.trim() ? 0.7 : 1,
              }}
            >
              {isSubmittingComment ? 'Adding...' : 'Add Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;