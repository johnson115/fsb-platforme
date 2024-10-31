import API_URL from './config';

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch posts');
    }
    return response.json();
  } catch (error) {
    console.error('Error in fetchPosts:', error);
    throw error;
  }
};

export const createPost = async (newPost) => {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create post');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error in createPost:', error);
    throw error;
  }
};

export const toggleLovePost = async (postId, action) => {
  try {
    const userId = localStorage.getItem('userId') || generateUserId();
    localStorage.setItem('userId', userId);

    const response = await fetch(`${API_URL}/posts/${postId}/love`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, userId }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update love status');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error in toggleLovePost:', error);
    throw error;
  }
};

export const addComment = async (postId, content) => {
  try {
    console.log('Sending comment request:', { postId, content }); // Debug log
    
    const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    console.log('Response status:', response.status); // Debug log

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error:', errorData); // Debug log
      throw new Error(errorData.message || 'Failed to add comment');
    }

    const data = await response.json();
    console.log('Comment added successfully:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Error in addComment:', error);
    throw error;
  }
};

function generateUserId() {
  return 'user_' + Math.random().toString(36).substr(2, 9);
}

export default {
  fetchPosts,
  createPost,
  toggleLovePost,
  addComment,
};