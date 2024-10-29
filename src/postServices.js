import API_URL from './config';

export const fetchPosts = async () => {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

export const createPost = async (newPost) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  return response.json();
};

export const lovePost = async (postId) => {
  const response = await fetch(`${API_URL}/posts/${postId}/love`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to love post');
  }
  return response.json();
};