import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Skeleton,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { fetchLatestPosts } from "../../services/api";
import { BlogPostSummary } from "../../types";
import moment from "moment";

interface LatestBlogsProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  showViewAllButton?: boolean;
}

const LatestBlogs: React.FC<LatestBlogsProps> = ({
  title = "Latest Articles",
  subtitle = "Discover our newest insights and strategies for digital wellbeing",
  limit = 3,
  showViewAllButton = true,
}) => {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
    <Box>
      <Box sx={{ textAlign: "center" }}>
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
          sx={{ maxWidth: 600, mx: "auto" }}
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
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    overflow: "hidden",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    height: "100%",
                    textDecoration: "none",
                    "&:hover": {
                      boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
                      "& .thumbnail-img": {
                        transform: "scale(1.05)",
                      },
                    },
                    transition: "box-shadow 0.3s ease",
                  }}
                >
                  <Box
                    sx={{
                      width: isMobile ? "100%" : "30%",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      className="thumbnail-img"
                      src={post.featured_image}
                      alt={post.image_alt}
                      sx={{
                        width: "100%",
                        height: isMobile ? "200px" : "100%",
                        objectFit: "cover",
                        transition: "transform 0.6s ease",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        bgcolor: "rgba(0, 0, 0, 0.6)",
                        color: "white",
                        py: 0.5,
                        px: 1,
                        borderRadius: 1,
                        fontSize: "0.75rem",
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
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        component="span"
                        sx={{
                          color: "primary.main",
                          bgcolor: "primary.light",
                          py: 0.5,
                          px: 1,
                          borderRadius: 1,
                          fontWeight: 500,
                        }}
                      >
                        {post.category.name || post.category.slug}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        {moment(post.published_at).format("MMMM DD, YYYY")}
                      </Typography>
                    </Box>

                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 600, color: "text.primary" }}
                    >
                      {post.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      {post.excerpt}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        By {post.author.full_name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        {post.estimated_reading_time} min read
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
      </Grid>
      {showViewAllButton && (
        <Box sx={{ textAlign: "center", mt: 5 }}>
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
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateX(5px)",
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
