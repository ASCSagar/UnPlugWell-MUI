// src/components/blog/BlogList.tsx
import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Skeleton, useTheme, useMediaQuery, Divider, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import Pagination from '../common/Pagination';
import CategoryList from '../category/CategoryList'; // Import the CategoryList component
import { BlogPostSummary, Category } from '../../types';
import { fetchAllPosts, fetchCategories } from '../../services/api';

interface BlogListProps {
  title?: string;
  subtitle?: string;
  currentPage: number;
  categorySlug?: string;
  tag?: string;
  searchQuery?: string;
}

const BlogList: React.FC<BlogListProps> = ({
  title = 'All Articles',
  subtitle,
  currentPage,
  categorySlug,
  tag,
  searchQuery,
}) => {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      
      // Here you'd typically call different API endpoints based on filters
      // For now, we'll just use fetchAllPosts as an example
      const result = await fetchAllPosts(currentPage);
      
      setPosts(result.posts);
      setTotalPages(result.totalPages);
      setLoading(false);
    };
    
    const loadCategories = async () => {
      setCategoriesLoading(true);
      try {
        const result = await fetchCategories();
        setCategories(result);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setCategoriesLoading(false);
      }
    };
    
    loadPosts();
    loadCategories();
    
    // Scroll to top when filters change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, categorySlug, tag, searchQuery]);
  
  // Container variants for staggered animations
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
  
  // Generate appropriate title based on filters
  const getFilteredTitle = () => {
    if (categorySlug) {
      return `${title}${categorySlug ? ` in ${categorySlug.replace(/-/g, ' ')}` : ''}`;
    }
    if (tag) {
      return `Articles tagged with "${tag}"`;
    }
    if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    }
    return title;
  };
  
  const filteredTitle = getFilteredTitle();
  
  // Render category chips for mobile view
  const renderCategoryChips = () => {
    if (categoriesLoading) {
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {Array.from(new Array(5)).map((_, index) => (
            <Skeleton key={index} width={100} height={32} sx={{ borderRadius: 16 }} />
          ))}
        </Box>
      );
    }
    
    return (
      <Box 
        component={motion.div}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 1, 
          mb: 3,
          justifyContent: 'center' 
        }}
      >
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            component="a"
            href={`/category/${category.slug}`}
            clickable
            sx={{
              background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.2) 0%, rgba(138, 93, 246, 0.2) 100%)',
              borderRadius: '16px',
              '&:hover': {
                background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.4) 0%, rgba(138, 93, 246, 0.4) 100%)',
              },
              ...(categorySlug === category.slug && {
                background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.7) 0%, rgba(138, 93, 246, 0.7) 100%)',
                color: 'white',
                fontWeight: 'bold',
              }),
            }}
          />
        ))}
      </Box>
    );
  };
  
  if (loading && posts.length === 0) {
    return (
      <Box>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {filteredTitle}
          </Typography>
          {subtitle && (
            <Typography variant="subtitle1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        
        {isMobile && renderCategoryChips()}
        
        <Grid container spacing={3}>
          {!isMobile && (
            <Grid item xs={12} md={3}>
              <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
            </Grid>
          )}
          
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              {Array.from(new Array(6)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
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
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }
  
  if (posts.length === 0) {
    return (
      <Box>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {filteredTitle}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            No articles found matching your criteria.
          </Typography>
        </Box>
        
        {isMobile ? renderCategoryChips() : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <CategoriesSidebar 
                categories={categories} 
                loading={categoriesLoading}
                activeCategory={categorySlug} 
              />
            </Grid>
          </Grid>
        )}
      </Box>
    );
  }
  
  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {filteredTitle}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle1" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
      
      {isMobile && renderCategoryChips()}
      
      <Grid container spacing={4}>
        {/* Categories Sidebar for Desktop */}
        {!isMobile && (
          <Grid item xs={12} md={3}>
            <CategoriesSidebar 
              categories={categories} 
              loading={categoriesLoading}
              activeCategory={categorySlug} 
            />
          </Grid>
        )}
        
        {/* Blog Posts Grid */}
        <Grid item xs={12} md={9}>
          <Grid
            container
            spacing={3}
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {posts.map((post) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={post.id}
                component={motion.div}
                variants={itemVariants}
              >
                <BlogCard post={post} />
              </Grid>
            ))}
          </Grid>
          
          <Box mt={6}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath={
                categorySlug
                  ? `/category/${categorySlug}`
                  : tag
                  ? `/tag/${tag}`
                  : searchQuery
                  ? `/search?q=${searchQuery}`
                  : '/blog'
              }
              scrollToTop
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

// Categories Sidebar Component
interface CategoriesSidebarProps {
  categories: Category[];
  loading: boolean;
  activeCategory?: string;
}

const CategoriesSidebar: React.FC<CategoriesSidebarProps> = ({ 
  categories, 
  loading,
  activeCategory 
}) => {
  const theme = useTheme();
  
  if (loading) {
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Categories
        </Typography>
        {Array.from(new Array(8)).map((_, index) => (
          <Skeleton key={index} height={40} sx={{ mb: 1 }} />
        ))}
      </Box>
    );
  }
  
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        position: 'sticky',
        top: 20,
        p: 3,
        borderRadius: 3,
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, rgba(91, 33, 182, 0.3) 0%, rgba(124, 58, 237, 0.3) 100%)'
          : 'linear-gradient(135deg, rgba(233, 213, 255, 0.7) 0%, rgba(243, 232, 255, 0.7) 100%)',
        backdropFilter: 'blur(8px)',
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' 
          ? 'rgba(139, 92, 246, 0.2)' 
          : 'rgba(216, 180, 254, 0.3)',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(139, 92, 246, 0.1)' 
          : '0 10px 30px rgba(0, 0, 0, 0.05), 0 0 20px rgba(167, 139, 250, 0.1)',
        mb: 4,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(167, 139, 250, 0.1), rgba(192, 132, 252, 0.05))',
          zIndex: 0,
          opacity: 0.4,
        }
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 3, 
          fontWeight: 700,
          position: 'relative',
          '&::after': {
            content: '""',
            display: 'block',
            width: '40px',
            height: '3px',
            background: 'linear-gradient(90deg, #8b5cf6, #c084fc)',
            mt: 1,
            borderRadius: '2px',
          }
        }}
      >
        Categories
      </Typography>
      
      <Box component="nav">
        <Box component="ul" sx={{ 
          listStyle: 'none', 
          p: 0, 
          m: 0,
        }}>
          {categories.map((category) => (
            <Box 
              component="li" 
              key={category.id}
              sx={{ 
                mb: 1.5,
              }}
            >
              <Box
                component="a"
                href={`/category/${category.slug}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 1.5,
                  borderRadius: 2,
                  textDecoration: 'none',
                  color: theme.palette.text.primary,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  background: activeCategory === category.slug 
                    ? 'linear-gradient(135deg, rgba(167, 139, 250, 0.4) 0%, rgba(138, 93, 246, 0.4) 100%)' 
                    : 'transparent',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.2) 0%, rgba(138, 93, 246, 0.2) 100%)',
                    transform: 'translateY(-2px)',
                  },
                  ...(activeCategory === category.slug && {
                    fontWeight: 700,
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)',
                  }),
                }}
              >
                <Typography 
                  variant="body1" 
                  sx={{ 
                    flex: 1,
                    fontWeight: activeCategory === category.slug ? 700 : 500,
                  }}
                >
                  {category.name}
                </Typography>
                
                <Box 
                  component="span"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '28px',
                    height: '28px',
                    borderRadius: '14px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    background: activeCategory === category.slug 
                      ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(168, 85, 247, 0.9) 100%)'
                      : 'rgba(139, 92, 246, 0.1)',
                    color: activeCategory === category.slug ? '#fff' : theme.palette.text.secondary,
                    ml: 1,
                  }}
                >
                  {0}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BlogList;