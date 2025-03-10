import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Skeleton } from "@mui/material";
import CategoryCard from "./CategoryCard";
import { Category } from "../../types";
import { fetchCategories } from "../../services/api";

interface CategoryListProps {
  title?: string;
  subtitle?: string;
}

const CategoryList: React.FC<CategoryListProps> = ({
  title = "Browse Categories",
  subtitle = "Explore our content by topics to find insights that matter to you",
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      const categoriesData = await fetchCategories();

      const activeCategories = categoriesData.filter(
        (cat) => cat.show_in_menu !== false
      );

      setCategories(activeCategories);
      setLoading(false);
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <Box>
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {Array.from(new Array(6)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (categories.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography variant="h4" gutterBottom>
          No Categories Found
        </Typography>
        <Typography variant="body1">
          Please check back later for category updates.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <CategoryCard category={category} index={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryList;
