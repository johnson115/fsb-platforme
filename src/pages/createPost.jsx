'use client';

import { useState } from 'react';
import { Button, TextField, Card, CardContent, CardHeader, Alert, CircularProgress } from '@mui/material';
import { Send, AlertCircle } from 'lucide-react';
import { createPost } from '../postServices';
import { useNavigate } from 'react-router-dom';

export default function CreatePost({ onPostCreated }) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const Navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    if (!name.trim() || !content.trim() || !email.trim()) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    try {
      const newPost = await createPost({ name, content, email });
      if (typeof onPostCreated === 'function') {
        onPostCreated(newPost);
      }
      setSuccess(true);
      setName('');
      setContent('');
      setEmail('');
    } catch (err) {
      console.error(err);
      setError('An error occurred while submitting your post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 700,  mx: 'auto', mt: 4, backgroundColor: '#303030', borderRadius: 2, boxShadow: 3 }}>
      <CardHeader
        title="Create New Post Anonymously & Hint Your Crush"
        titleTypographyProps={{ variant: 'h5', align: 'center', color: '#FFB6C1' }}
      />
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Your Name (or Nickname)"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name or nickname"
            sx={{ mb: 2, backgroundColor: '#909090' , zIndex:'0' }}
          />
          <TextField
            fullWidth
            label="Your Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            sx={{ mb: 2, backgroundColor: '#909090' }}
          />
          <TextField
            fullWidth
            label="Post Content"
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your hints or message here..."
            multiline
            minRows={4}
            sx={{ mb: 2, backgroundColor: '#909090' }}
          />
          {error && (
            <Alert severity="error" icon={<AlertCircle className="w-4 h-4" />} sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Your post has been submitted successfully!
            </Alert>
          )}
          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            disabled={isSubmitting} 
            fullWidth
            sx={{
              backgroundColor: '#FFB6C1', 
              '&:hover': { backgroundColor: '#fa9ba9' },
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            {isSubmitting ? 'Submitting...' : 'Submit Post'}
            {success ? Navigate("/") : '' }
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}