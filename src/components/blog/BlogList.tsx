import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Blogs } from "../../types";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Avatar,
  Grid,
  Skeleton,
  useTheme,
  useMediaQuery,
  Chip,
  Divider,
  alpha,
  Paper,
  Container,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface BlogListProps {
  title?: string;
  subtitle?: string;
}

const BlogList: React.FC<BlogListProps> = ({ title, subtitle }) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [categories, setCategories] = useState(["All"]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blogs[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const theme = useTheme();
  const MotionPaper = motion(Paper);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://unplugwell.com/blog/api/posts/?site_domain=unplugwell.com&page=${page}`
        );
        if (page === 1) {
          setBlogs(response.data.results);
        } else {
          setBlogs((prev) => [...prev, ...response.data.results]);
        }
        setHasMore(response.data.next !== null);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://unplugwell.com/blog/api/get-categories/?site=unplugwell.com"
        );
        setCategories((prev) => [
          "All",
          ...response.data.results.map((category) => category.name),
        ]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    let filtered = blogs;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (blog) => blog.category?.name === selectedCategory
      );
    }

    setFilteredBlogs(filtered);
  }, [selectedCategory, blogs]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

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

  const renderCategoryChips = () => {
    return (
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          mb: 3,
          justifyContent: "center",
          px: 2,
        }}
      >
        {categories.map((category, index) => (
          <Chip
            key={index}
            label={category}
            onClick={() => setSelectedCategory(category)}
            sx={{
              background:
                selectedCategory === category
                  ? "linear-gradient(135deg, rgba(167, 139, 250, 0.7) 0%, rgba(138, 93, 246, 0.7) 100%)"
                  : "linear-gradient(135deg, rgba(167, 139, 250, 0.2) 0%, rgba(138, 93, 246, 0.2) 100%)",
              borderRadius: "16px",
              color: selectedCategory === category ? "white" : "inherit",
              fontWeight: selectedCategory === category ? "bold" : "normal",
              mb: 1,
              "&:hover": {
                background:
                  "linear-gradient(135deg, rgba(167, 139, 250, 0.4) 0%, rgba(138, 93, 246, 0.4) 100%)",
              },
            }}
          />
        ))}
      </Box>
    );
  };

  const renderLoadingSkeletons = () => {
    return (
      <Box>
        {isMobile && renderCategoryChips()}

        <Grid container spacing={3}>
          {!isMobile && (
            <Grid item xs={12} md={3}>
              <Skeleton
                variant="rectangular"
                height={400}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          )}

          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              {Array.from(new Array(isMobile ? 4 : 6)).map((_, index) => (
                <Grid item xs={12} sm={isMobile ? 12 : 6} md={4} key={index}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={200}
                    sx={{ borderRadius: 2, mb: 1 }}
                  />
                  <Skeleton width="80%" height={28} sx={{ mb: 0.5 }} />
                  <Skeleton width="60%" height={28} sx={{ mb: 1 }} />
                  <Skeleton width="90%" height={20} sx={{ mb: 0.5 }} />
                  <Skeleton width="90%" height={20} sx={{ mb: 1 }} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const renderNoResults = () => {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h6" align="center" color="text.secondary">
          No blogs available for the "{selectedCategory}" category.
        </Typography>
        <Box mt={2}>
          <Chip
            label="Back to All Blogs"
            onClick={() => setSelectedCategory("All")}
            sx={{
              background: "linear-gradient(135deg, #8b5cf6, #c084fc)",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>
    );
  };

  if (loading && blogs.length === 0) {
    return renderLoadingSkeletons();
  }

  return (
    <Box
      sx={{
        pt: 8,
        pb: 8,
        bgcolor: alpha(theme.palette.primary.light, 0.05),
      }}
    >
      <Container>
        <MotionPaper
          elevation={2}
          sx={{
            p: { xs: 3, md: 5 },
            mb: 5,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.primary.light,
              0.2
            )}, ${alpha(theme.palette.background.paper, 0.9)})`,
            position: "relative",
            overflow: "hidden",
          }}
          initial="hidden"
          animate="visible"
        >
          <Box>
            <Typography
              variant="h3"
              component="h1"
              align="center"
              fontWeight={700}
              sx={{
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                mb: 2,
              }}
            >
              {title}
            </Typography>

            <Divider
              sx={{
                width: "100px",
                mx: "auto",
                my: 3,
                borderColor: alpha(theme.palette.primary.main, 0.3),
              }}
            />
            <Typography align="center" sx={{ maxWidth: "700px", mx: "auto" }}>
              {subtitle}
            </Typography>
          </Box>
        </MotionPaper>
      </Container>

      {isMobile && renderCategoryChips()}

      <Grid container spacing={isMobile ? 2 : 4}>
        {!isMobile && (
          <Grid item xs={12} md={3}>
            <CategoriesSidebar
              categories={categories}
              loading={loading}
              activeCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </Grid>
        )}
        <Grid item xs={12} md={9}>
          {filteredBlogs.length === 0 ? (
            renderNoResults()
          ) : (
            <>
              <Grid
                container
                spacing={isMobile ? 2 : 3}
                component={motion.div}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredBlogs.map((blog) => (
                  <Grid
                    item
                    xs={12}
                    sm={isMobile ? 12 : 6}
                    md={4}
                    key={blog.id}
                    component={motion.div}
                    variants={itemVariants}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 3,
                        overflow: "hidden",
                        border: "1px solid",
                        borderColor: "divider",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
                          "& .card-image": {
                            transform: "scale(1.05)",
                          },
                        },
                      }}
                    >
                      <CardActionArea
                        component={RouterLink}
                        to={`/blog/${blog.slug}`}
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "stretch",
                        }}
                      >
                        <Box sx={{ position: "relative", overflow: "hidden" }}>
                          <CardMedia
                            component="img"
                            className="card-image"
                            image={blog.featured_image}
                            alt={blog.image_alt}
                            sx={{
                              height: 200,
                              transition: "transform 0.6s ease",
                            }}
                          />

                          <Box
                            sx={{
                              position: "absolute",
                              top: 16,
                              left: 16,
                              bgcolor: "primary.main",
                              color: "white",
                              borderRadius: 1,
                              py: 0.5,
                              px: 1.5,
                              fontSize: "0.75rem",
                              fontWeight: 500,
                              textTransform: "uppercase",
                              letterSpacing: 0.5,
                            }}
                          >
                            {blog.category.name}
                          </Box>
                        </Box>

                        <CardContent
                          sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            gutterBottom
                            variant={"h6"}
                            component="h2"
                            sx={{
                              fontWeight: 600,
                              mb: 1,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {blog.title}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mb: 2,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              flexGrow: 1,
                            }}
                          >
                            {blog.excerpt}
                          </Typography>

                          <Box
                            sx={{
                              mt: "auto",
                              pt: 2,
                              borderTop: "1px solid",
                              borderColor: "divider",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar
                                src={`https://source.unsplash.com/random/100x100/?portrait&${blog.author.id}`}
                                alt={blog.author.full_name}
                                sx={{ width: 24, height: 24, mr: 1 }}
                              />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {blog.author.full_name}
                              </Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <AccessTimeIcon
                                sx={{
                                  fontSize: 14,
                                  mr: 0.5,
                                  color: "text.secondary",
                                }}
                              />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {blog.estimated_reading_time} min read
                              </Typography>
                            </Box>
                          </Box>

                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                          >
                            {moment(blog.published_at).format("MMMM DD, YYYY")}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              {hasMore && (
                <Box mt={6} display="flex" justifyContent="center">
                  <Chip
                    label={loading ? "Loading..." : "Load More"}
                    onClick={loadMore}
                    disabled={loading}
                    sx={{
                      background: loading
                        ? "rgba(139, 92, 246, 0.5)"
                        : "linear-gradient(135deg, #8b5cf6, #c084fc)",
                      color: "white",
                      fontWeight: "bold",
                      cursor: loading ? "default" : "pointer",
                      "&:hover": {
                        background: loading
                          ? "rgba(139, 92, 246, 0.5)"
                          : "linear-gradient(135deg, #7c3aed, #a855f7)",
                      },
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

interface CategoriesSidebarProps {
  categories: string[];
  loading: boolean;
  activeCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoriesSidebar: React.FC<CategoriesSidebarProps> = ({
  categories,
  loading,
  activeCategory,
  setSelectedCategory,
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
        position: "sticky",
        top: 20,
        p: 3,
        borderRadius: 3,
        background:
          "linear-gradient(135deg, rgba(233, 213, 255, 0.7) 0%, rgba(243, 232, 255, 0.7) 100%)",
        backdropFilter: "blur(8px)",
        border: "1px solid",
        borderColor: "rgba(216, 180, 254, 0.3)",
        boxShadow:
          "0 10px 30px rgba(0, 0, 0, 0.05), 0 0 20px rgba(167, 139, 250, 0.1)",
        mb: 4,
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(45deg, rgba(167, 139, 250, 0.1), rgba(192, 132, 252, 0.05))",
          zIndex: 0,
          opacity: 0.4,
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: 700,
          position: "relative",
          "&::after": {
            content: '""',
            display: "block",
            width: "40px",
            height: "3px",
            background: "linear-gradient(90deg, #8b5cf6, #c084fc)",
            mt: 1,
            borderRadius: "2px",
          },
        }}
      >
        Categories
      </Typography>

      <Box component="nav">
        <Box
          component="ul"
          sx={{
            listStyle: "none",
            p: 0,
            m: 0,
          }}
        >
          {categories.map((category, index) => (
            <Box
              component="li"
              key={index}
              sx={{
                mb: 1.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 1.5,
                  borderRadius: 2,
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  background:
                    activeCategory === category
                      ? "linear-gradient(135deg, rgba(167, 139, 250, 0.4) 0%, rgba(138, 93, 246, 0.4) 100%)"
                      : "transparent",
                  cursor: "pointer",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, rgba(167, 139, 250, 0.2) 0%, rgba(138, 93, 246, 0.2) 100%)",
                    transform: "translateY(-2px)",
                  },
                  ...(activeCategory === category && {
                    fontWeight: 700,
                    boxShadow: "0 4px 12px rgba(139, 92, 246, 0.15)",
                  }),
                }}
                onClick={() => setSelectedCategory(category)}
              >
                <Typography
                  variant="body1"
                  sx={{
                    flex: 1,
                    fontWeight: activeCategory === category ? 700 : 500,
                  }}
                >
                  {category}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BlogList;
