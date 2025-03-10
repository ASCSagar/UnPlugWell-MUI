import React, { useState, useEffect } from "react";
import {
  Divider,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  Box,
  TextField,
  InputAdornment,
  Skeleton,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { Search, Folder, ArrowForward } from "@mui/icons-material";
import Layout from "../components/layout/Layout";
import Seo from "../components/layout/Seo";
import Subscribe from "../components/common/Subscribe";
import { fetchCategories } from "../services/api";
import { Category } from "../types";
import { useNavigate } from "react-router-dom";

const gradientColors = [
  "linear-gradient(to right, #ec4899, #ef4444)",
  "linear-gradient(to right, #4ade80, #15803d)",
  "linear-gradient(to right, #3b82f6, #4f46e5)",
  "linear-gradient(to right, #facc15, #f97316)",
  "linear-gradient(to right, #a855f7, #6b21a8)",
  "linear-gradient(to right, #14b8a6, #0d9488)",
];

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useTheme();
  const naviagte = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const categoriesData = await fetchCategories();
        setCategories(
          categoriesData.map((item: Category, index: number) => ({
            ...item,
            colorIndex: index % gradientColors.length,
          }))
        );
      } catch (error) {
        console.error("error", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <Seo
        title="Explore Digital Detox Topics & Tips | UnplugWell"
        description="Expert tips on digital detox, mindfulness, and tech-free living. Explore UnplugWell’s top categories for a balanced, healthier lifestyle."
        canonicalUrl="/categories/"
      />
      <Box sx={{ px: isMobile ? 2 : 0 }}>
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Categories
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Discover focused content across various aspects of digital wellness
          </Typography>
          <Box sx={{ mt: 4, maxWidth: 600, mx: "auto" }}>
            <TextField
              fullWidth
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "28px",
                  backgroundColor: "background.paper",
                  borderColor: "divider",
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 8 }} />

      <Box sx={{ px: isMobile ? 2 : 0, mb: 8 }}>
        {loading ? (
          <Grid container spacing={4}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Skeleton variant="rectangular" height={40} width={40} />
                    <Skeleton variant="text" height={40} width="60%" />
                    <Skeleton variant="text" height={20} width="80%" />
                    <Skeleton variant="text" height={20} width="80%" />
                    <Skeleton variant="text" height={20} width="60%" />
                  </CardContent>
                  <CardActions>
                    <Skeleton variant="rectangular" height={30} width={120} />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : filteredCategories.length > 0 ? (
          <Grid container spacing={4}>
            {filteredCategories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    background: gradientColors[category.colorIndex],
                    color: "white",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          p: 1.5,
                          borderRadius: "12px",
                        }}
                      >
                        <Folder fontSize="medium" />
                      </Box>
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {category.name}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {category.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      endIcon={<ArrowForward fontSize="small" />}
                      sx={{ color: "white", fontWeight: "bold" }}
                      onClick={() => naviagte(category?.slug)}
                    >
                      Explore Category
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No Category Found.
            </Typography>
          </Box>
        )}
      </Box>

      <Subscribe variant="boxed" />
    </Layout>
  );
};

export default CategoryPage;
