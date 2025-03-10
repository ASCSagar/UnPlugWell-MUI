// src/components/home/HeroSection.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Container, useTheme, useMediaQuery, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  // For parallax scrolling effect
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  // For animated gradient background
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  const scrollToContent = () => {
    const contentElement = document.getElementById('main-content');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <Box
      sx={{
        position: 'relative',
        height: '90vh',
        minHeight: '500px',
        width: '100%',
        overflow: 'hidden',
        color: 'white',
        mt: -25,// This negative margin removes the gap between navbar and hero
        // Increase top padding to account for navbar
        pt: { xs: -300, md: -15, lg: -20 },
        pb: { xs: 10, md: 0 },
        
      }}
    >
      {/* Animated background with gradient and noise */}
      <Box
        sx={{
          position: 'absolute',
          top: 100,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#0f172a',
          zIndex: -2,
        }}
      />
      
      <Box
        component={motion.div}
        animate={{ 
          rotate: [0, 360],
          transition: { duration: 60, repeat: Infinity, ease: "linear" }
        }}
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `conic-gradient(
            from ${rotation}deg,
            rgba(99, 102, 241, 0.7),
            rgba(139, 92, 246, 0.7),
            rgba(236, 72, 153, 0.7),
            rgba(139, 92, 246, 0.7),
            rgba(99, 102, 241, 0.7)
          )`,
          opacity: 0.5,
          zIndex: -1,
        }}
      />
      
      {/* Noise overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%\' height=\'100%\' filter=\'url(%23noiseFilter)\' opacity=\'0.3\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          zIndex: -1,
          opacity: 0.3,
          mixBlendMode: 'overlay',
        }}
      />
      
      {/* Floating glass shapes */}
      <Box
        component={motion.div}
        initial={{ x: -100, y: -100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.7 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ y: y2 }}
        sx={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '40% 60% 60% 40% / 60% 30% 70% 40%',
          background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.1))',
          backdropFilter: 'blur(8px)',
          opacity: 0.7,
          zIndex: 0,
          display: { xs: 'none', md: 'block' },
        }}
      />
      
      <Box
        component={motion.div}
        initial={{ x: 100, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.5 }}
        transition={{ duration: 1, delay: 0.4 }}
        style={{ y: y1 }}
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: '250px',
          height: '250px',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          background: 'linear-gradient(45deg, rgba(236, 72, 153, 0.3), rgba(99, 102, 241, 0.1))',
          backdropFilter: 'blur(8px)',
          opacity: 0.5,
          zIndex: 0,
          display: { xs: 'none', md: 'block' },
        }}
      />
      
      {/* Content */}
      <Container maxWidth="lg" sx={{ height: '100%', position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            pt: { xs: 16, md: 16 }, // Increased top padding to account for navbar
          }}
        >
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ y: y2 }}
            sx={{
              maxWidth: { xs: '100%', md: '50%' },
              pr: { md: 4 },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Box
                sx={{
                  display: 'inline-block',
                  px: 2,
                  py: 1,
                  mb: 3,
                  borderRadius: '9999px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  Welcome to UnplugWell
                </Typography>
              </Box>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem', lg: '4.5rem' },
                  mb: 2,
                  lineHeight: 1.1,
                  backgroundImage: 'linear-gradient(90deg, #a5b4fc, #f0abfc)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 20px rgba(165, 180, 252, 0.3)',
                }}
              >
                Reclaim Your Digital Balance
              </Typography>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 400,
                  mb: 4,
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: 1.6,
                }}
              >
                Create a healthier relationship with technology through mindful practices, expert guidance, and practical strategies for digital well-being.
              </Typography>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}
              >
                <Button
                  component={RouterLink}
                  to="/blog"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    borderRadius: '9999px',
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.5)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 20px 25px -5px rgba(99, 102, 241, 0.4)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Start Your Journey
                </Button>
                
                <Button
                  component={RouterLink}
                  to="/about"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    borderRadius: '9999px',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-3px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </motion.div>
          </Box>
          
          {!isSmall && (
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              style={{ y: y1 }}
              sx={{
                position: 'relative',
                width: { xs: '100%', sm: '70%', md: '45%' },
                maxWidth: '550px',
                height: '450px',
                mt: { xs: 6, md: 0 },
              }}
            >
              {/* Glass card effect for the main image */}
              <Paper
                elevation={0}
                sx={{
                  position: 'relative',
                  height: '100%',
                  width: '100%',
                  overflow: 'hidden',
                  borderRadius: '30px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  transform: 'perspective(1500px) rotateY(-15deg)',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s ease',
                  '&:hover': {
                    transform: 'perspective(1500px) rotateY(-5deg)',
                  },
                }}
              >
                <Box
                  component="img"
                  src="https://unplugwell.com/media/blog/images/digital-detox-and-career-growth.jpg"
                  alt="Digital wellbeing"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    opacity: 0.85,
                  }}
                />
              </Paper>
              
              {/* Decorative elements */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                sx={{
                  position: 'absolute',
                  top: -20,
                  left: -20,
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  opacity: 0.8,
                  zIndex: -1,
                }}
              />
              
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                sx={{
                  position: 'absolute',
                  bottom: -15,
                  right: -15,
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                  opacity: 0.8,
                  zIndex: -1,
                }}
              />
            </Box>
          )}
        </Box>
      </Container>
      
      {/* Scroll indicator */}
      <Box
        component={motion.div}
        style={{ opacity }}
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Button
            onClick={scrollToContent}
            variant="outlined"
            sx={{
              borderRadius: '50%',
              minWidth: '50px',
              width: '50px',
              height: '50px',
              p: 0,
              border: '2px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <KeyboardArrowDownIcon />
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default HeroSection;