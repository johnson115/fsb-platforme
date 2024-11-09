import API_URL from './config';



function ensureUserId() {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userId', userId);
  }
  return userId ;
}

export const createPost = async (newPost) => {
  try {
    console.log('Sending post data:', newPost);
    
    const response = await fetch(`${API_URL}/posts.js`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newPost.name,
        content: newPost.content,
        email: newPost.email,
        gender: newPost.gender
      }),
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error response:', errorData);
      throw new Error(errorData.message || 'Failed to create post');
    }
    
    const data = await response.json();
    console.log('Server response:', data);
    return data;
  } catch (error) {
    console.error('Error in createPost:', error);
    throw error;
  }
};

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/posts.js`);
    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching posts:', errorData);
      throw new Error(errorData.message || 'Failed to fetch posts');
    }
    
    const data = await response.json();
    console.log('Fetched posts:', data);
    return data;
  } catch (error) {
    console.error('Error in fetchPosts:', error);
    throw error;
  }
};


export const toggleLovePost = async (postId, action) => {
  try {
    console.log('Sending love request:', { postId, action });
    
    const userId = ensureUserId();

    const response = await fetch(`${API_URL}/love.js?id=${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: action,
        userId: userId
      })
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error response:', errorData);
      throw new Error(errorData.message || 'Failed to update love status');
    }

    const data = await response.json();
    console.log('Server response:', data);
    return data;
  } catch (error) {
    console.error('Error in toggleLovePost:', error);
    throw error;
  }
};


export const addComment = async (postId, content) => {
  try {
    console.log('Sending comment request:', { postId, content });
    
    const response = await fetch(`${API_URL}/comments.js?id=${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error:', errorData);
      throw new Error(errorData.message || 'Failed to add comment');
    }

    const data = await response.json();
    console.log('Comment added successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in addComment:', error);
    throw error;
  }
};



export default {
  fetchPosts,
  createPost,
  toggleLovePost,
  addComment,
};