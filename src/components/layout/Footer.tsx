// src/components/layout/Footer.tsx
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Divider,
  IconButton,
  Button,
  Stack,
  TextField,
  InputAdornment,
  Collapse,
  Tooltip,
  Paper,
  Chip,
  useTheme,
  useMediaQuery,
  Alert,
  Snackbar,
} from '@mui/material';

// Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArticleIcon from '@mui/icons-material/Article';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import GavelIcon from '@mui/icons-material/Gavel';
import CookieIcon from '@mui/icons-material/Cookie';
import InfoIcon from '@mui/icons-material/Info';

import { motion } from 'framer-motion';
import { fetchCategories } from '../../services/api';
import { Category } from '../../types';

const Footer = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [email, setEmail] = useState('');
  const [showLegalLinks, setShowLegalLinks] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [subscribeError, setSubscribeError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        // Get only a few categories for the footer
        setCategories(categoriesData.slice(0, 5));
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    
    loadCategories();
  }, []);
  
  const currentYear = new Date().getFullYear();
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setSubscribeError(true);
      setErrorMessage('Please enter your email address');
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setSubscribeError(true);
      setErrorMessage('Please enter a valid email address');
      return;
    }
    
    // Here you would typically send the email to your backend
    console.log(`Subscribing email: ${email}`);
    setEmail('');
    setSubscribeSuccess(true);
    setSubscribeError(false);
  };
  
  const handleCloseSnackbar = () => {
    setSubscribeSuccess(false);
    setSubscribeError(false);
  };
  
  const toggleLegalLinks = () => {
    setShowLegalLinks(!showLegalLinks);
  };
  
  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com/unplugwell', label: 'Facebook' },
    { icon: <TwitterIcon />, url: 'https://twitter.com/unplugwell', label: 'Twitter' },
    { icon: <InstagramIcon />, url: 'https://instagram.com/unplugwell', label: 'Instagram' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com/company/unplugwell', label: 'LinkedIn' }
  ];
  
  const quickLinks = [
    { text: 'Home', url: '/' },
    { text: 'Blog', url: '/blog' },
    { text: 'About Us', url: '/about' },
    { text: 'Contact', url: '/contact' }
  ];
  
  const legalLinks = [
    { text: 'Privacy Policy', url: '/privacy-policy', icon: <PrivacyTipIcon fontSize="small" /> },
    { text: 'Terms of Service', url: '/terms-of-service', icon: <GavelIcon fontSize="small" /> },
    { text: 'Cookie Policy', url: '/cookie-policy', icon: <CookieIcon fontSize="small" /> },
    { text: 'Disclaimer', url: '/disclaimer', icon: <InfoIcon fontSize="small" /> }
  ];
  
  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' 
          : 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
        color: '#fff',
        mt: 'auto',
        pt: { xs: 6, md: 8 },
        pb: { xs: 4, md: 6 },
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          zIndex: 0,
        }}
      />
      
      {/* Decorative shapes */}
      <Box
        component={motion.div}
        animate={{
          y: [0, -15, 0],
          transition: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
        sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '250px',
          height: '250px',
          borderRadius: '40% 60% 70% 30% / 40% 50% 50% 60%',
          background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          zIndex: 0,
          display: { xs: 'none', md: 'block' },
          filter: 'blur(40px)',
        }}
      />
      
      <Box
        component={motion.div}
        animate={{
          y: [0, 15, 0],
          transition: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }
        }}
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '200px',
          height: '200px',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
          zIndex: 0,
          display: { xs: 'none', md: 'block' },
          filter: 'blur(30px)',
        }}
      />
      
      {/* Main content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          {/* About section */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box>
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  mb: 2, 
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <NightsStayIcon fontSize="large" />
                UnplugWell
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.9, lineHeight: 1.7 }}>
                Discover the benefits of digital detox. Explore expert tips, resources, 
                and strategies to disconnect, recharge, and find balance in a tech-driven world.
              </Typography>
              
              <Stack 
                direction="row" 
                spacing={1}
                sx={{
                  '.MuiIconButton-root': {
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-3px)',
                    }
                  }
                }}
              >
                {socialLinks.map((social, index) => (
                  <Tooltip key={index} title={social.label} arrow>
                    <IconButton
                      color="inherit"
                      aria-label={social.label}
                      component="a"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Stack>
            </Box>
          </Grid>
          
          {/* Quick Links section */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Quick Links
            </Typography>
            
            <Stack spacing={1.5}>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  component={RouterLink}
                  to={link.url}
                  sx={{
                    color: 'inherit',
                    display: 'block',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    opacity: 0.9,
                    '&:hover': {
                      opacity: 1,
                      pl: 0.5,
                      fontWeight: 500,
                    },
                  }}
                >
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      '&:hover .MuiSvgIcon-root': {
                        opacity: 1,
                        transform: 'translateX(4px)',
                      }
                    }}
                  >
                    <Typography variant="body2">{link.text}</Typography>
                    <ArrowForwardIcon 
                      sx={{ 
                        ml: 1, 
                        fontSize: '0.8rem', 
                        opacity: 0, 
                        transition: 'all 0.3s ease',
                      }} 
                    />
                  </Box>
                </Link>
              ))}
            </Stack>
          </Grid>
          
          {/* Categories section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Categories
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {categories.map((category) => (
                <Chip
                  key={category.id}
                  label={category.name}
                  component={RouterLink}
                  to={`/category/${category.slug}`}
                  clickable
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    mb: 1,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                />
              ))}
            </Box>
            
            <Button
              component={RouterLink}
              to="/categories"
              variant="text"
              color="inherit"
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                mt: 2,
                opacity: 0.9,
                fontSize: '0.875rem',
                '&:hover': {
                  opacity: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              View all categories
            </Button>
          </Grid>
          
          {/* Newsletter section */}
          <Grid item xs={12} sm={6} md={3} lg={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Subscribe to Our Newsletter
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.9, lineHeight: 1.7 }}>
              Join our newsletter to receive the latest updates and tips on digital wellbeing.
            </Typography>
            
            <Box
              component="form"
              onSubmit={handleSubscribe}
              sx={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mb: 3,
              }}
            >
              <TextField
                value={email}
                onChange={handleEmailChange}
                placeholder="Your email address"
                variant="outlined"
                fullWidth
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.7)',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                    </InputAdornment>
                  ),
                }}
              />
              
              <Button
                type="submit"
                variant="contained"
                startIcon={<SendIcon />}
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  fontWeight: 600,
                  py: 1.2,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                Subscribe Now
              </Button>
              
              <Typography variant="caption" sx={{ opacity: 0.8, textAlign: 'center' }}>
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
        
        {/* Legal section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'center' : 'flex-start',
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          <Typography variant="body2" sx={{ mb: isMobile ? 2 : 0, opacity: 0.8 }}>
            © {currentYear} UnplugWell. All rights reserved.
          </Typography>
          
          <Box sx={{ mb: isMobile ? 2 : 0 }}>
            <Button
              onClick={toggleLegalLinks}
              color="inherit"
              endIcon={showLegalLinks ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              sx={{ 
                opacity: 0.8,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  opacity: 1
                },
                display: { xs: 'flex', md: 'none' }
              }}
            >
              Legal
            </Button>
            
            <Stack 
              direction={{ xs: 'column', md: 'row' }} 
              spacing={{ xs: 1, md: 3 }}
              sx={{ 
                display: { xs: showLegalLinks ? 'flex' : 'none', md: 'flex' } 
              }}
            >
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  component={RouterLink}
                  to={link.url}
                  color="inherit"
                  underline="hover"
                  variant="body2"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    opacity: 0.8,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      opacity: 1,
                    }
                  }}
                >
                  {link.icon}
                  {link.text}
                </Link>
              ))}
            </Stack>
          </Box>
        </Box>
        
        {/* Scroll to top button, visible only when scrolling down */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          sx={{ 
            position: 'absolute',
            bottom: 16,
            right: 16,
            zIndex: 2,
          }}
        >
          <Tooltip title="Back to top" arrow>
            <IconButton
              color="inherit"
              aria-label="scroll to top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(4px)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-3px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <KeyboardArrowUpIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Container>

      {/* Success and error notifications */}
      <Snackbar 
        open={subscribeSuccess} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={handleCloseSnackbar}>
          Thank you for subscribing! Check your email for confirmation.
        </Alert>
      </Snackbar>
      
      <Snackbar 
        open={subscribeError} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={handleCloseSnackbar}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Footer;