// src/pages/HomePage.tsx
import React, { useEffect } from 'react';
import { Box, Container, useTheme, useMediaQuery, Typography, Grid, Button, Divider } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Seo from '../components/layout/Seo';
import HeroSection from '../components/home/HeroSection';
import CookieConsent from '../components/common/CookieConsent';
import FeaturedContent from '../components/home/FeaturedContent';
import SubscriptionSection from '../components/home/SubscriptionSection';
import UnplugIcon from '@mui/icons-material/PowerSettingsNew';
import MindfulnessIcon from '@mui/icons-material/SelfImprovement';
import BalanceIcon from '@mui/icons-material/Balance';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start("visible");
  }, [controls]);
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  return (
    // Use the Layout component with disableContainer for full-width sections
    <Layout disableContainer>
      <Seo
        title="UnplugWell - Digital Detox & Mindful Technology Use"
        description="Discover the benefits of digital detox with UnplugWell. Expert tips, resources, and strategies to disconnect, recharge, and find balance in a tech-driven world."
        ogType="website"
      />
      
      {/* Hero Section Wrapper with proper spacing for navbar */}
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 8, md: 8 }, // Add top padding to create space below navbar
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.95) 0%, rgba(168, 85, 247, 0.9) 100%)',
          overflow: 'hidden',
        }}
      >
        {/* Background decorative blobs */}
        <Box
          component={motion.div}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 1, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          sx={{
            position: 'absolute',
            top: '10%',
            left: '-5%',
            width: { xs: 250, md: 400 },
            height: { xs: 250, md: 400 },
            borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%',
            background: 'rgba(216, 180, 254, 0.2)',
            filter: 'blur(40px)',
            zIndex: 0,
          }}
        />
        
        <Box
          component={motion.div}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -1, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 5,
          }}
          sx={{
            position: 'absolute',
            bottom: '5%',
            right: '-5%',
            width: { xs: 200, md: 350 },
            height: { xs: 200, md: 350 },
            borderRadius: '46% 54% 63% 37% / 45% 52% 48% 55%',
            background: 'rgba(192, 132, 252, 0.15)',
            filter: 'blur(40px)',
            zIndex: 0,
          }}
        />
        
        {/* Use your existing HeroSection component */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <HeroSection />
        </Box>
      </Box>
      
      {/* Why Digital Detox Matters Section */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(180deg, rgba(15, 23, 42, 1) 0%, rgba(15, 23, 42, 0.95) 100%)' 
            : 'linear-gradient(180deg, rgba(243, 232, 255, 1) 0%, rgba(237, 233, 254, 0.95) 100%)',
          position: 'relative',
        }}
      >
        {/* Background decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: theme.palette.mode === 'dark'
              ? 'radial-gradient(rgba(99, 102, 241, 0.15) 1px, transparent 1px)'
              : 'radial-gradient(rgba(139, 92, 246, 0.08) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            opacity: 0.7,
            zIndex: 0,
          }}
        />
        
        {/* Soft lavender texture overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: theme.palette.mode === 'dark' ? 0 : 0.3,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%238b5cf6\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
            zIndex: 0,
          }}
        />
        
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Box 
            component={motion.div}
            initial="hidden"
            animate={controls}
            variants={fadeInUp}
            sx={{ 
              textAlign: 'center', 
              mb: { xs: 6, md: 10 },
              px: 2,
            }}
          >
            <Typography 
              variant="h2" 
              component="h2" 
              sx={{ 
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.75rem' },
                backgroundImage: 'linear-gradient(90deg, #8b5cf6, #d8b4fe)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Why Digital Detox Matters
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ 
                maxWidth: 800, 
                mx: 'auto', 
                fontSize: '1.1rem',
                lineHeight: 1.7,
                mb: 4 
              }}
            >
              In our always-connected world, finding moments to disconnect is essential for mental health,
              creativity, and meaningful relationships. Our approach helps you create better digital habits.
            </Typography>
            
            <Divider 
              sx={{ 
                width: '80px', 
                mx: 'auto', 
                borderColor: 'primary.main',
                borderWidth: '2px',
                borderRadius: '2px',
                mb: 6
              }} 
            />
          </Box>
          
          <Grid 
            container 
            spacing={4}
            component={motion.div}
            initial="hidden"
            animate={controls}
            variants={staggerContainer}
          >
            <BenefitCard 
              icon={<UnplugIcon fontSize="large" />}
              title="Conscious Disconnection"
              description="Learn strategic ways to disconnect from technology without missing what truly matters. Create intentional breaks that refresh your mind and boost productivity."
            />
            
            <BenefitCard 
              icon={<MindfulnessIcon fontSize="large" />}
              title="Mindful Technology Use"
              description="Discover practices to engage with digital tools more mindfully. Transform your relationship with technology from distracting to purposeful and supportive."
            />
            
            <BenefitCard 
              icon={<BalanceIcon fontSize="large" />}
              title="Digital-Life Balance"
              description="Develop sustainable habits that create harmony between your online and offline worlds. Find the right balance that works for your unique lifestyle."
            />
          </Grid>
        </Container>
      </Box>
      
      {/* Stats Section - New */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%)' 
            : 'linear-gradient(135deg, rgba(237, 233, 254, 0.8) 0%, rgba(243, 232, 255, 0.8) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative background element */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0.05,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Box 
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: { xs: 3, md: 6 },
                    borderRadius: '24px',
                    bgcolor: theme.palette.mode === 'dark' 
                      ? 'rgba(30, 41, 59, 0.5)' 
                      : 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark' 
                      ? 'rgba(139, 92, 246, 0.2)' 
                      : 'rgba(226, 232, 240, 0.8)',
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 20px 25px -5px rgba(0, 0, 0, 0.5)' 
                      : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      mb: 4,
                      fontSize: { xs: '1.75rem', md: '2.25rem' },
                      color: theme.palette.text.primary,
                    }}
                  >
                    Digital Overload is Real
                  </Typography>
                  
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: '1.1rem',
                        lineHeight: 1.7,
                        color: theme.palette.text.secondary,
                        mb: 2,
                      }}
                    >
                      The average person spends over 7 hours per day on screens, leading to:
                    </Typography>
                    
                    <Box 
                      component="ul" 
                      sx={{ 
                        pl: 2, 
                        '& li': { 
                          mb: 1,
                          color: theme.palette.text.secondary,
                        } 
                      }}
                    >
                      <li>Decreased attention span and focus</li>
                      <li>Disrupted sleep patterns</li>
                      <li>Increased anxiety and stress</li>
                      <li>Reduced face-to-face interactions</li>
                    </Box>
                  </Box>
                  
                  <Button
                    component={RouterLink}
                    to="/blog"
                    variant="contained"
                    color="primary"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      py: 1.5,
                      px: 3,
                      borderRadius: '10px',
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Explore Our Solutions
                  </Button>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Grid container spacing={4}>
                  <StatCard 
                    number="86%" 
                    label="of adults check their smartphone within an hour of waking up"
                  />
                  
                  <StatCard 
                    number="3 hrs" 
                    label="average daily social media use among adults" 
                  />
                  
                  <StatCard 
                    number="73%" 
                    label="of people feel anxious when separated from their phone" 
                  />
                  
                  <StatCard 
                    number="47%" 
                    label="experience improved mental wellbeing after digital detox" 
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      
      {/* Featured Content Section - Smooth transition with curved separator */}
      <Box
        sx={{
          position: 'relative',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)' 
            : 'linear-gradient(180deg, rgba(237, 233, 254, 0.8) 0%, rgba(243, 232, 255, 0.95) 100%)',
          pt: { xs: 14, md: 20 },
          pb: { xs: 8, md: 12 },
          mt: -10, // Pull up to create overlap
        }}
      >
        {/* Curved separator */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: { xs: 80, md: 120 },
            zIndex: 0,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: '-5%',
              width: '110%',
              height: '200%',
              borderRadius: '50%',
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%)' 
                : 'linear-gradient(135deg, rgba(237, 233, 254, 0.8) 0%, rgba(243, 232, 255, 0.8) 100%)',
            }}
          />
        </Box>
        
        {/* Background texture */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: theme.palette.mode === 'dark'
              ? 'radial-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px)'
              : 'radial-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            opacity: 0.7,
            zIndex: 0,
          }}
        />
        
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            sx={{ 
              textAlign: 'center', 
              mb: { xs: 6, md: 10 },
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            <Typography 
              variant="h2" 
              component="h2" 
              sx={{ 
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.75rem' },
                backgroundImage: 'linear-gradient(90deg, #8b5cf6, #d8b4fe)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Resources to Guide Your Journey
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ 
                fontSize: '1.1rem',
                lineHeight: 1.7,
                mb: 4,
                px: 2,
              }}
            >
              Explore our curated content designed to help you build a healthier relationship with technology
              and discover the benefits of intentional digital breaks.
            </Typography>
          </Box>
          
          {/* Featured Content Component */}
          <FeaturedContent isMobile={isMobile} />
        </Container>
      </Box>
      
      {/* Subscription section with gradient background */}
      <SubscriptionSection />
      
      {/* Cookie Consent Banner */}
      <CookieConsent />
    </Layout>
  );
};

// Benefit Card Component
const BenefitCard = ({ icon, title, description }) => {
  const theme = useTheme();
  
  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <Grid item xs={12} md={4} component={motion.div} variants={cardVariant}>
      <Box
        sx={{
          height: '100%',
          p: 4,
          borderRadius: '16px',
          bgcolor: theme.palette.mode === 'dark' 
            ? 'rgba(30, 41, 59, 0.5)' 
            : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: theme.palette.mode === 'dark' 
            ? 'rgba(139, 92, 246, 0.2)' 
            : 'rgba(226, 232, 240, 0.8)',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.2)' 
            : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: theme.palette.mode === 'dark'
            ? '0 25px 30px -5px rgba(0, 0, 0, 0.6), 0 10px 15px -6px rgba(0, 0, 0, 0.3)' 
            : '0 25px 30px -5px rgba(0, 0, 0, 0.15), 0 10px 15px -6px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
            background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.2), rgba(139, 92, 246, 0.2))',
            color: '#8b5cf6',
          }}
        >
          {icon}
        </Box>
        
        <Typography
          variant="h5"
          component="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: '1.25rem',
          }}
        >
          {title}
        </Typography>
        
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            lineHeight: 1.7,
            mb: 2,
            flex: 1,
          }}
        >
          {description}
        </Typography>
        
        <Box sx={{ mt: 'auto' }}>
          <Button
            component={RouterLink}
            to="/blog"
            endIcon={<ArrowForwardIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              p: 0,
              '&:hover': {
                background: 'none',
                color: '#8b5cf6',
                '& .MuiSvgIcon-root': {
                  transform: 'translateX(4px)',
                }
              },
              '& .MuiSvgIcon-root': {
                transition: 'transform 0.2s ease',
              }
            }}
          >
            Learn more
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

// Stat Card Component
const StatCard = ({ number, label }) => {
  const theme = useTheme();
  
  return (
    <Grid item xs={6}>
      <Box
        sx={{
          p: 3,
          borderRadius: '16px',
          bgcolor: theme.palette.mode === 'dark' 
            ? 'rgba(30, 41, 59, 0.5)' 
            : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: theme.palette.mode === 'dark' 
            ? 'rgba(139, 92, 246, 0.2)' 
            : 'rgba(226, 232, 240, 0.8)',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 10px 15px -3px rgba(0, 0, 0, 0.5)' 
            : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
          }
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 1,
            fontSize: { xs: '1.75rem', md: '2.25rem' },
            color: '#8b5cf6',
          }}
        >
          {number}
        </Typography>
        
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            lineHeight: 1.4,
          }}
        >
          {label}
        </Typography>
      </Box>
    </Grid>
  );
};

export default HomePage;