import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Rating, 
  Box, 
  Snackbar, 
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/system';
import { Star } from 'lucide-react';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: '0 auto',
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    formData.append('access_key', '9fdec94d-fcad-4d40-8d13-21e0b12728c2');
    formData.append('rating', rating.toString());

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSnackbar({ open: true, message: 'Thank you for your feedback!', severity: 'success' });
        e.target.reset();
        setRating(0);
      } else {
        setSnackbar({ open: true, message: 'Something went wrong. Please try again.', severity: 'error' });
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Something went wrong. Please try again.', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <StyledCard elevation={3} sx={{backgroundColor: '#303030', border:'1px solid #FFB6C1', borderRadius:'24px' }} > 
        <CardContent>
          <Typography variant="h4" component="h1" color="white" gutterBottom align="center">
           ⭐️ We Value Your Feedback ⭐️
          </Typography>
          <Typography variant="body1" color="#FFB6C1" gutterBottom align="center" >
            Help us improve by sharing your thoughts and experiences 📝
          </Typography>
          <Form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              sx={{backgroundColor:'#707070'}}
              required
            />
            <TextField
              label="Email 📩"
              name="email"
              type="email"
              
              fullWidth
              sx={{backgroundColor:'#707070'}}
              required
            />
            <Box>
              <Typography component="legend">Rating</Typography>
              <Rating
                name="rating"
                sx={{color:'white'}}
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                
                icon={<Star fontSize="inherit" color="goldenrod" />}
                emptyIcon={<Star fontSize="inherit" color='#909090' />}
                size="large"
              />
              
            </Box>
            <TextField
              label="Message"
              name="message"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              sx={{backgroundColor:'#707070'}}
              required
            />
            <Button 
              type="submit" 
              variant="contained" 
              sx={{backgroundColor:'#FFB6C1' , color:'white'}}
              size="large"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isLoading ? 'Sending...' : 'Send Feedback'}
            </Button>
          </Form>
        </CardContent>
      </StyledCard>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}