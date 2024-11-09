'use client';

import { useState } from 'react';
import { 
  Button, 
  TextField, 
  Card, 
  CardContent, 
  CardHeader, 
  Alert, 
  CircularProgress,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { Send, AlertCircle } from 'lucide-react';
import { createPost } from '../postServices';
import { useNavigate } from 'react-router-dom';

export default function CreatePost({ onPostCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    content: '',
    email: '',
    gender: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    const { name, content, email, gender } = formData;

    if (!name.trim() || !content.trim() || !email.trim() || !gender) {
      setError('Please fill in all fields, including gender');
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Submitting form data:', formData); // Debug log
      const newPost = await createPost(formData);
      console.log('Response from server:', newPost); // Debug log
      
      if (typeof onPostCreated === 'function') {
        onPostCreated(newPost);
      }
      
      setSuccess(true);
      setFormData({
        name: '',
        content: '',
        email: '',
        gender: ''
      });
      
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error('Submission error:', err);
      setError('An error occurred while submitting your post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 700, mx: 'auto', mt: 7, backgroundColor: '#303030', border:'1px solid #FFB6C1', borderRadius: '24px', boxShadow: 3 }}>
      <CardHeader
        title="🕵️‍♂️ Create Post Anonymously & Hint Your Crush 🤫"
        titleTypographyProps={{ variant: 'h5', align: 'center', color: 'white' }}
      />
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            name="name"
            label="Your Name (or Nickname)"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name or nickname"
            sx={{ mb: 2, backgroundColor: '#909090', zIndex:'0' }}
            required
          />
          <TextField
            fullWidth
            name="email"
            label="Your Email (don't worry it will be hidden on the post)"
            variant="outlined"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            sx={{ mb: 2, backgroundColor: '#909090' }}
            required
          />
          <FormControl component="fieldset" required sx={{ mb: 2, width: '100%' }}>
            <FormLabel component="legend" sx={{ color: 'white' }}>Gender *</FormLabel>
            <RadioGroup
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              row
              sx={{ justifyContent: 'center' }}
            >
              <FormControlLabel 
                value="male" 
                control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: '#FFB6C1' } }} />} 
                label="Male" 
                sx={{ color: 'white' }} 
              />
              <FormControlLabel 
                value="female" 
                control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: '#FFB6C1' } }} />} 
                label="Female" 
                sx={{ color: 'white' }} 
              />
            </RadioGroup>
          </FormControl>
          <TextField
            fullWidth
            name="content"
            label="Post Content"
            variant="outlined"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your hints or message here..."
            multiline
            minRows={4}
            sx={{ mb: 2, backgroundColor: '#909090' }}
            required
          />
          {error && (
            <Alert severity="error" icon={<AlertCircle className="w-4 h-4" />} sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Your post has been submitted successfully! Redirecting to home page...
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
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}