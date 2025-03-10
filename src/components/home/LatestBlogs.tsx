// src/components/home/LatestBlogs.tsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button, Skeleton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';
import BlogCard from '../blog/BlogCard';
import { fetchLatestPosts } from '../../services/api';
import { BlogPostSummary } from '../../types';

interface LatestBlogsProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  showViewAllButton?: boolean;
}

const LatestBlogs: React.FC<LatestBlogsProps> = ({
  title = 'Latest Articles',
  subtitle = 'Discover our newest insights and strategies for digital wellbeing',
  limit = 4,
  showViewAllButton = true,
}) => {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const latestPosts = await fetchLatestPosts();
      setPosts(latestPosts.slice(0, limit));
      setLoading(false);
    };
    
    loadPosts();
  }, [limit]);
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };
  
  return (
    <Box component="section" sx={{ py: 5 }}>
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          {title}
        </Typography>
        
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto' }}
        >
          {subtitle}
        </Typography>
      </Box>
      
      <Grid
        container
        spacing={3}
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {loading
          ? Array.from(new Array(limit)).map((_, index) => (
              <Grid item xs={12} sm={6} md={limit > 3 ? 3 : 4} key={index}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={200}
                  sx={{ borderRadius: 2, mb: 1 }}
                />
                <Skeleton width="80%" height={28} sx={{ mb: 0.5 }} />
                <Skeleton width="60%" height={28} sx={{ mb: 1 }} />
                <Skeleton width="90%" height={20} sx={{ mb: 0.5 }} />
                <Skeleton width="90%" height={20} />
              </Grid>
            ))
          : posts.map((post) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={limit > 3 ? 3 : 4}
                key={post.id}
                component={motion.div}
                variants={itemVariants}
              >
                <BlogCard post={post} />
              </Grid>
            ))}
      </Grid>
      
      {showViewAllButton && (
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Button
            component={RouterLink}
            to="/blog"
            endIcon={<ArrowForwardIcon />}
            variant="outlined"
            color="primary"
            size="large"
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateX(5px)',
              },
            }}
          >
            View All Articles
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default LatestBlogs;