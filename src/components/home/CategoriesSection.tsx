// src/components/home/CategoriesSection.tsx
import React, { useEffect, useRef } from 'react';
import { Box, Typography, useTheme, Container } from '@mui/material';
import { motion, useAnimation, useInView } from 'framer-motion';
import CategoryList from '../category/CategoryList';
import ExploreIcon from '@mui/icons-material/Explore';

const CategoriesSection = () => {
  const theme = useTheme();
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const floatingBackground = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    }
  };
  
  const titleAnimation = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        delay: 0.2 
      }
    }
  };
  
  // Blob shapes for background
  const BlobShape = ({ color, ...props }) => (
    <Box
      component={motion.div}
      animate={{
        scale: [1, 1.05, 1],
        rotate: [0, 3, 0],
        x: [0, 5, 0],
        y: [0, -5, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      sx={{
        position: 'absolute',
        width: { xs: 180, md: 300 },
        height: { xs: 180, md: 300 },
        borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%',
        background: color,
        filter: 'blur(40px)',
        opacity: 0.5,
        zIndex: 0,
        ...props.sx
      }}
      {...props}
    />
  );
  
  return (
    <Box
      ref={ref}
      component={motion.div}
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
      sx={{ 
        mb: 10,
        mt: 15,
        position: 'relative',
        overflow: 'hidden',
        py: 8
      }}
    >
      {/* Background decorative elements - lavender gradient blobs */}
      <BlobShape 
        color="rgba(167, 139, 250, 0.35)" 
        sx={{ top: '10%', left: '-5%' }} 
      />
      <BlobShape 
        color="rgba(192, 132, 252, 0.25)" 
        sx={{ bottom: '5%', right: '-5%' }} 
      />
      <BlobShape 
        color="rgba(216, 180, 254, 0.3)" 
        sx={{ top: '40%', right: '25%' }} 
      />
      
      <Container maxWidth="xl">
        <Box 
          component={motion.div}
          variants={titleAnimation}
          sx={{ 
            textAlign: 'center', 
            mb: 8,
            px: 2,
            position: 'relative',
            zIndex: 1
          }}
        >
          {/* Animated icon */}
          <Box 
            sx={{ 
              display: 'flex',
              justifyContent: 'center',
              mb: 2
            }}
          >
            <Box
              component={motion.div}
              animate={{ 
                rotateY: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "loop"
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.2))',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              <ExploreIcon 
                sx={{ 
                  fontSize: { xs: 40, md: 48 },
                  color: 'transparent',
                  backgroundImage: 'linear-gradient(90deg, #8b5cf6, #d8b4fe)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                }}
              />
            </Box>
          </Box>
          
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              fontWeight: 800,
              mb: 3,
              fontSize: { xs: '2rem', md: '3rem' },
              backgroundImage: 'linear-gradient(90deg, #8b5cf6, #d8b4fe)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              textShadow: theme.palette.mode === 'dark' ? '0 0 30px rgba(167, 139, 250, 0.5)' : 'none',
            }}
          >
            Explore by Topics
          </Typography>
          
          <Box
            component={motion.div}
            variants={{
              hidden: { width: 0 },
              visible: { 
                width: '120px',
                transition: { duration: 0.7, delay: 0.5 }
              }
            }}
            sx={{
              height: '4px',
              background: 'linear-gradient(90deg, #8b5cf6, #c084fc)',
              borderRadius: '2px',
              mx: 'auto',
              mb: 4,
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
                animation: 'shimmer 2s infinite',
              },
              '@keyframes shimmer': {
                '0%': { transform: 'translateX(-100%)' },
                '100%': { transform: 'translateX(100%)' }
              }
            }}
          />
          
          <Typography 
            component={motion.p}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.7, delay: 0.7 }
              }
            }}
            color="text.secondary"
            sx={{ 
              maxWidth: 700, 
              mx: 'auto', 
              fontSize: '1.1rem',
              lineHeight: 1.7 
            }}
          >
            Browse our content collections organized by topic to find exactly what you're looking for. 
            From digital mindfulness to tech-life balance, we cover it all.
          </Typography>
        </Box>
        
        <Box 
          component={motion.div}
          variants={floatingBackground}
          sx={{ 
            position: 'relative',
            zIndex: 2,
            p: { xs: 2, md: 4 },
            borderRadius: '24px',
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(135deg, rgba(91, 33, 182, 0.4) 0%, rgba(124, 58, 237, 0.4) 100%)'
              : 'linear-gradient(135deg, rgba(233, 213, 255, 0.7) 0%, rgba(243, 232, 255, 0.7) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' 
              ? 'rgba(139, 92, 246, 0.3)' 
              : 'rgba(216, 180, 254, 0.4)',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(139, 92, 246, 0.2)' 
              : '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(167, 139, 250, 0.15)',
            overflow: 'hidden',
            transformStyle: 'preserve-3d',
            transform: 'perspective(1000px)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(216, 180, 254, 0.2), rgba(245, 208, 254, 0.1), rgba(167, 139, 250, 0.2))',
              zIndex: -1,
              opacity: 0.6,
              animation: 'gradientShift 8s ease infinite',
            },
            '@keyframes gradientShift': {
              '0%': {
                backgroundPosition: '0% 50%'
              },
              '50%': {
                backgroundPosition: '100% 50%'
              },
              '100%': {
                backgroundPosition: '0% 50%'
              }
            }
          }}
        >
          {/* Floating cards effect */}
          <Box
            component={motion.div}
            animate={{ 
              rotateX: [0, 1, 0],
              rotateY: [0, 1, 0],
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              repeatType: "loop"
            }}
            style={{ 
              width: '100%',
              transformStyle: 'preserve-3d'
            }}
          >
            <CategoryList title="" subtitle="" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CategoriesSection;