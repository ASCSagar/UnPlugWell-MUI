// src/pages/CategoryPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Divider } from '@mui/material';
import Layout from '../components/layout/Layout';
import Seo from '../components/layout/Seo';
import BlogList from '../components/blog/BlogList';
import CategoryList from '../components/category/CategoryList';
import Subscribe from '../components/common/Subscribe';
import { fetchCategories } from '../services/api';
import { Category } from '../types';

const CategoryPage = () => {
  const { slug, page } = useParams<{ slug?: string; page?: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  
  const currentPage = page ? parseInt(page, 10) : 1;
  
  useEffect(() => {
    const loadCategory = async () => {
      if (!slug) return;
      
      setLoading(true);
      const categories = await fetchCategories();
      const matchedCategory = categories.find((cat) => cat.slug === slug);
      
      if (matchedCategory) {
        setCategory(matchedCategory);
      }
      
      setLoading(false);
    };
    
    loadCategory();
    // Scroll to top when slug changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);
  
  // If no slug is provided, display all categories
  if (!slug) {
    return (
      <Layout>
        <Seo
          title="Categories - UnplugWell"
          description="Browse our article categories on digital detox, mindfulness, health & wellness, and more to find content that matches your interests."
          canonicalUrl="/categories"
        />
        
        <CategoryList />
        
        <Divider sx={{ my: 8 }} />
        
        <Subscribe variant="boxed" />
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Seo
        title={category ? `${category.name} - UnplugWell` : `Category - UnplugWell`}
        description={category?.description || `Explore articles about ${slug.replace(/-/g, ' ')} for a balanced digital lifestyle.`}
        canonicalUrl={`/category/${slug}`}
      />
      
      <BlogList
        title={category?.name || slug.replace(/-/g, ' ')}
        subtitle={category?.description}
        currentPage={currentPage}
        categorySlug={slug}
      />
      
      <Divider sx={{ my: 8 }} />
      
      <Subscribe variant="boxed" />
    </Layout>
  );
};

export default CategoryPage;