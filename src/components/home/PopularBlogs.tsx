// src/components/home/PopularBlogs.tsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Skeleton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { fetchPopularPosts } from '../../services/api';
import { BlogPostSummary } from '../../types';
import { formatDate } from '../../utils/formatDate';

interface PopularBlogsProps {
  title?: string;
  subtitle?: string;
  limit?: number;
}

const PopularBlogs: React.FC<PopularBlogsProps> = ({
  title = 'Popular Articles',
  subtitle = 'Our most-read content on digital wellness and mindful technology use',
  limit = 3,
}) => {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const popularPosts = await fetchPopularPosts();
      setPosts(popularPosts.slice(0, limit));
      setLoading(false);
    };
    
    loadPosts();
  }, [limit]);
  
  return (
    <Box
      component="section"
      sx={{
        py: 8,
        bgcolor: 'background.paper',
        borderRadius: 4,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
      }}
    >
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
      
      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(limit)).map((_, index) => (
              <Grid item xs={12} key={index}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={isMobile ? 200 : 120}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            ))
          : posts.map((post, index) => (
              <Grid 
                item 
                xs={12} 
                key={post.id}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Paper
                  component={RouterLink}
                  to={`/blog/${post.slug}`}
                  elevation={0}
                  sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    overflow: 'hidden',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    height: '100%',
                    textDecoration: 'none',
                    '&:hover': {
                      boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
                      '& .thumbnail-img': {
                        transform: 'scale(1.05)',
                      },
                    },
                    transition: 'box-shadow 0.3s ease',
                  }}
                >
                  <Box
                    sx={{
                      width: isMobile ? '100%' : '30%',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      className="thumbnail-img"
                      src={post.featured_image}
                      alt={post.image_alt}
                      sx={{
                        width: '100%',
                        height: isMobile ? '200px' : '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        bgcolor: 'rgba(0, 0, 0, 0.6)',
                        color: 'white',
                        py: 0.5,
                        px: 1,
                        borderRadius: 1,
                        fontSize: '0.75rem',
                      }}
                    >
                      <VisibilityIcon fontSize="inherit" />
                      <Typography variant="caption">
                        {parseInt(post.view_count).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ p: 3, flex: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        component="span"
                        sx={{
                          color: 'primary.main',
                          bgcolor: 'primary.light',
                          py: 0.5,
                          px: 1,
                          borderRadius: 1,
                          fontWeight: 500,
                        }}
                      >
                        {post.category.name || post.category.slug}
                      </Typography>
                      
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(post.published_at)}
                      </Typography>
                    </Box>
                    
                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 600, color: 'text.primary' }}
                    >
                      {post.title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {post.excerpt}
                    </Typography>
                    
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 2,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        By {post.author.full_name}
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        {post.estimated_reading_time} min read
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default PopularBlogs;