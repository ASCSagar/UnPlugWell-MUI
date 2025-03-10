// src/pages/BlogPage.tsx
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Box, Container, Divider } from '@mui/material';
import Layout from '../components/layout/Layout';
import Seo from '../components/layout/Seo';
import BlogList from '../components/blog/BlogList';
import Subscribe from '../components/common/Subscribe';

const BlogPage = () => {
  const { page } = useParams<{ page?: string }>();
  const currentPage = page ? parseInt(page, 10) : 1;
  
  // Extract search query if this is a search results page
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q') || undefined;
  
  return (
    <Layout>
      <Seo
        title={searchQuery ? `Search results for "${searchQuery}" - UnplugWell` : "Blog - UnplugWell"}
        description={searchQuery
          ? `Explore articles related to "${searchQuery}" on UnplugWell - digital detox, mindfulness, and balanced technology use.`
          : "Explore articles on digital detox, mindfulness, and balanced technology use to improve your digital wellbeing."}
        canonicalUrl="/blog"
      />
      
      <BlogList
        currentPage={currentPage}
        searchQuery={searchQuery}
        title={searchQuery ? `Search Results: ${searchQuery}` : "Digital Wellbeing Blog"}
        subtitle={searchQuery
          ? `Showing articles related to "${searchQuery}"`
          : "Insights, tips and strategies for a balanced digital lifestyle"}
      />
      
      <Divider sx={{ my: 8 }} />
      
      <Subscribe variant="boxed" />
    </Layout>
  );
};

export default BlogPage;