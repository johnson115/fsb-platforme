'use client';

import { useState } from 'react';
import { Button, TextField, Card, CardContent, CardHeader, Typography, Alert } from '@mui/material';
import { AlertCircle } from 'lucide-react';

export default function CreatePost() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    if (!name.trim() || !content.trim()) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    // Simulating an API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Post submitted:', { name, content });
      setSuccess(true);
      setName('');
      setContent('');
    } catch (err) {
      setError('An error occurred while submitting your post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <h2 style={{ color: "#05052b", textAlign: "center", margin: "10px " }}>
          Create New Post Anonymously & Hint Your Crush
        </h2>
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4, backgroundColor: '#05052b', borderRadius: 2, boxShadow: 3 }}>
      <CardHeader>
        
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <TextField
              fullWidth
              label="Your Name (or Nickname)"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name or nickname"
              sx={{ backgroundColor: '#ccc' }} // Gray background for input
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="Post Content"
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your hints or message here..."
              multiline
              minRows={4}
              sx={{ marginTop: "10px", backgroundColor: '#ccc' }} // Gray background for textarea
            />
          </div>
          {error && (
            <Alert severity="error" icon={<AlertCircle className="w-4 h-4" />}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success">
              Your post has been submitted successfully!
            </Alert>
          )}
        </form>
      </CardContent>
      <CardContent>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit} 
          disabled={isSubmitting} 
          fullWidth
          sx={{
            backgroundColor: '#FFB6C1', 
            '&:hover': { backgroundColor: '#ff9fb1' }, // Custom hover effect
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Post'}
        </Button>
      </CardContent>
    </Card>
    </>
  );
}
