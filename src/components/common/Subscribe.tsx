// src/components/common/Subscribe.tsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { motion } from 'framer-motion';

interface SubscribeProps {
  variant?: 'default' | 'minimal' | 'boxed';
  title?: string;
  subtitle?: string;
}

const Subscribe: React.FC<SubscribeProps> = ({
  variant = 'default',
  title = 'Stay Updated',
  subtitle = 'Subscribe to our newsletter for the latest articles and updates on digital wellbeing.',
}) => {
  const [email, setEmail] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorOpen(true);
      return;
    }
    
    // Here you would typically call an API to handle the subscription
    console.log('Subscribing email:', email);
    
    // Show success message and reset form
    setSuccessOpen(true);
    setEmail('');
  };
  
  const renderSubscribeForm = () => (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 1,
          width: '100%',
        }}
      >
        <TextField
          fullWidth
          placeholder="Your email address"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size={variant === 'minimal' ? 'small' : 'medium'}
          required
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: variant === 'minimal' ? 4 : 8,
            },
          }}
        />
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          size={variant === 'minimal' ? 'small' : 'medium'}
          sx={{
            px: 3,
            whiteSpace: 'nowrap',
            borderRadius: variant === 'minimal' ? 4 : 8,
          }}
        >
          Subscribe
        </Button>
      </Box>
    </Box>
  );
  
  if (variant === 'minimal') {
    return (
      <Box sx={{ width: '100%' }}>
        {renderSubscribeForm()}
        
        <Snackbar open={successOpen} autoHideDuration={6000} onClose={() => setSuccessOpen(false)}>
          <Alert severity="success" onClose={() => setSuccessOpen(false)}>
            Thank you for subscribing!
          </Alert>
        </Snackbar>
        
        <Snackbar open={errorOpen} autoHideDuration={6000} onClose={() => setErrorOpen(false)}>
          <Alert severity="error" onClose={() => setErrorOpen(false)}>
            Please enter a valid email address.
          </Alert>
        </Snackbar>
      </Box>
    );
  }
  
  if (variant === 'boxed') {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          width: '100%',
        }}
      >
        <Typography variant="h5" component="h3" gutterBottom>
          {title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          {subtitle}
        </Typography>
        
        {renderSubscribeForm()}
        
        <Snackbar open={successOpen} autoHideDuration={6000} onClose={() => setSuccessOpen(false)}>
          <Alert severity="success" onClose={() => setSuccessOpen(false)}>
            Thank you for subscribing!
          </Alert>
        </Snackbar>
        
        <Snackbar open={errorOpen} autoHideDuration={6000} onClose={() => setErrorOpen(false)}>
          <Alert severity="error" onClose={() => setErrorOpen(false)}>
            Please enter a valid email address.
          </Alert>
        </Snackbar>
      </Paper>
    );
  }
  
  // Default variant
  return (
    <Box
      sx={{
        py: 6,
        px: 3,
        textAlign: 'center',
        borderRadius: 3,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        width: '100%',
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        {title}
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
        {subtitle}
      </Typography>
      
      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        {renderSubscribeForm()}
      </Box>
      
      <Snackbar open={successOpen} autoHideDuration={6000} onClose={() => setSuccessOpen(false)}>
        <Alert severity="success" onClose={() => setSuccessOpen(false)}>
          Thank you for subscribing!
        </Alert>
      </Snackbar>
      
      <Snackbar open={errorOpen} autoHideDuration={6000} onClose={() => setErrorOpen(false)}>
        <Alert severity="error" onClose={() => setErrorOpen(false)}>
          Please enter a valid email address.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Subscribe;