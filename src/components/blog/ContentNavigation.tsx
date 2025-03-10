// src/components/blog/ContentNavigation.tsx
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Skeleton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { BlogPostSummary } from '../../types';
import { fetchAllPosts } from '../../services/api';

interface ContentNavigationProps {
  slug: string;
}

const ContentNavigation: React.FC<ContentNavigationProps> = ({ slug }) => {
  const [prevPost, setPrevPost] = useState<BlogPostSummary | null>(null);
  const [nextPost, setNextPost] = useState<BlogPostSummary | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchNavigationPosts = async () => {
      setLoading(true);
      
      try {
        // Fetch a larger set of posts to find the current one
        const { posts } = await fetchAllPosts(1);
        
        // Find the index of the current post
        const currentIndex = posts.findIndex((post) => post.slug === slug);
        
        if (currentIndex !== -1) {
          // Set previous post (if not first post)
          if (currentIndex > 0) {
            setPrevPost(posts[currentIndex - 1]);
          } else {
            setPrevPost(null);
          }
          
          // Set next post (if not last post)
          if (currentIndex < posts.length - 1) {
            setNextPost(posts[currentIndex + 1]);
          } else {
            setNextPost(null);
          }
        }
      } catch (error) {
        console.error('Error fetching navigation posts:', error);
      }
      
      setLoading(false);
    };
    
    fetchNavigationPosts();
  }, [slug]);
  
  if (loading) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
        </Grid>
      </Grid>
    );
  }
  
  if (!prevPost && !nextPost) {
    return null;
  }
  
  return (
    <Grid container spacing={2}>
      {prevPost && (
        <Grid item xs={12} sm={6}>
          <Paper
            component={RouterLink}
            to={`/blog/${prevPost.slug}`}
            elevation={0}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                borderColor: 'primary.main',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <ArrowBackIcon
                fontSize="small"
                sx={{ mr: 1, color: 'primary.main' }}
              />
              <Typography variant="caption" color="primary.main" fontWeight={500}>
                Previous Article
              </Typography>
            </Box>
            
            <Typography
              variant="subtitle2"
              color="text.primary"
              sx={{
                fontWeight: 600,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {prevPost.title}
            </Typography>
          </Paper>
        </Grid>
      )}
      
      {nextPost && (
        <Grid item xs={12} sm={6}>
          <Paper
            component={RouterLink}
            to={`/blog/${nextPost.slug}`}
            elevation={0}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                borderColor: 'primary.main',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 1,
                justifyContent: 'flex-end',
              }}
            >
              <Typography variant="caption" color="primary.main" fontWeight={500}>
                Next Article
              </Typography>
              <ArrowForwardIcon
                fontSize="small"
                sx={{ ml: 1, color: 'primary.main' }}
              />
            </Box>
            
            <Typography
              variant="subtitle2"
              color="text.primary"
              sx={{
                fontWeight: 600,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                textAlign: 'right',
              }}
            >
              {nextPost.title}
            </Typography>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default ContentNavigation;