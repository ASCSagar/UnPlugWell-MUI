import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Container,
  Button,
  Avatar,
} from "@mui/material";
import moment from "moment";
import { motion } from "framer-motion";
import { BlogPost } from "../../types";
import LoadingSpinner from "../common/LoadingSpinner";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

interface BlogDetailProps {
  post: BlogPost;
  loading: boolean;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post, loading }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  if (loading) {
    return <LoadingSpinner fullPage message="Loading article..." />;
  }

  if (!post) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h4" gutterBottom>
          Article Not Found
        </Typography>
        <Typography variant="body1">
          The article you're looking for doesn't exist or has been removed.
        </Typography>
      </Box>
    );
  }
  const shareUrl = `https://unplugwell.com/blog/${post.slug}`;
  return (
    <Box
      component="main"
      sx={{
        pt: 12,
        minHeight: "100vh",
        background:
          "linear-gradient(to right, rgba(238, 242, 255, 0.3), rgba(254, 242, 254, 0.3))",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: 2, md: 3, lg: 4 },
          py: 6,
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: 1.5,
                      mb: 2,
                    }}
                  >
                    <Chip
                      label={post.category.name}
                      sx={{
                        px: 1.5,
                        py: 2.5,
                        bgcolor: "primary.main",
                        color: "white",
                        fontWeight: 500,
                        borderRadius: "9999px",
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        color: "text.secondary",
                        fontSize: "0.875rem",
                      }}
                    >
                      <CalendarTodayIcon sx={{ fontSize: "1rem" }} />
                      <Typography variant="body2">
                        {moment(post.published_at).format("MMMM DD, YYYY")}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        color: "text.secondary",
                        fontSize: "0.875rem",
                      }}
                    >
                      <AccessTimeIcon sx={{ fontSize: "1rem" }} />
                      <Typography variant="body2">
                        {post.estimated_reading_time} min read
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        color: "text.secondary",
                        fontSize: "0.875rem",
                      }}
                    >
                      <VisibilityIcon sx={{ fontSize: "1rem" }} />
                      <Typography variant="body2">
                        {post.view_count} views
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "1.875rem", md: "2.25rem", lg: "3rem" },
                      mb: 2,
                      background: "linear-gradient(to right, #4f46e5, #e11d48)",
                      backgroundClip: "text",
                      color: "transparent",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    {post.excerpt}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      pt: 2,
                      borderTop: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          background:
                            "linear-gradient(to bottom right, #4f46e5, #e11d48)",
                          fontWeight: 600,
                        }}
                      >
                        {post.author.full_name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={500}>
                          {post.author.full_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Author & Content Creator
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
              {post.featured_image && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Box
                    sx={{
                      borderRadius: 4,
                      overflow: "hidden",
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    <Box
                      component="img"
                      src={post.featured_image}
                      alt={post.image_alt}
                      sx={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                        transition: "transform 0.7s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    />
                  </Box>
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 6 },
                    borderRadius: 4,
                    background:
                      "linear-gradient(to bottom right, rgba(238, 242, 255, 0.8), rgba(254, 242, 254, 0.8))",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Box
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    sx={{
                      typography: "body1",
                      "& h1, & h2, & h3, & h4, & h5, & h6": {
                        color: "text.primary",
                        fontWeight: 600,
                      },
                      "& h1": { fontSize: "2.25rem", mt: 6, mb: 4 },
                      "& h2": { fontSize: "1.875rem", mt: 5, mb: 3 },
                      "& h3": { fontSize: "1.5rem", mt: 4, mb: 2 },
                      "& p": {
                        mb: 3,
                        fontSize: "1.125rem",
                        lineHeight: 1.7,
                        color: "text.secondary",
                      },
                      "& a": {
                        color: "primary.main",
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      },
                      "& img": {
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: 2,
                        my: 4,
                      },
                      "& blockquote": {
                        borderLeft: "4px solid",
                        borderColor: "primary.main",
                        pl: 3,
                        py: 1,
                        my: 4,
                        fontStyle: "italic",
                      },
                      "& ul, & ol": {
                        pl: 3,
                        mb: 4,
                      },
                      "& li": {
                        mb: 1,
                      },
                    }}
                  />
                </Paper>
              </motion.div>
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box
              sx={{
                position: "sticky",
                top: 24,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}
                >
                  <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={handleGoBack}
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      borderRadius: "9999px",
                      px: 3,
                      py: 1,
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    }}
                  >
                    Back to Blogs
                  </Button>
                </Box>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    background:
                      "linear-gradient(to bottom right, rgba(238, 242, 255, 0.8), rgba(254, 242, 254, 0.8))",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AutoAwesomeIcon
                      sx={{ fontSize: "1rem", color: "primary.main", mr: 1 }}
                    />
                    Share this article
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 1.5,
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        borderRadius: 2,
                        bgcolor: "rgba(29, 161, 242, 0.1)",
                        color: "#1DA1F2",
                        cursor: "pointer",
                        "&:hover": { bgcolor: "rgba(29, 161, 242, 0.2)" },
                      }}
                      onClick={() =>
                        window.open(
                          "https://twitter.com/intent/tweet?url=" + shareUrl,
                          "_blank"
                        )
                      }
                    >
                      <TwitterIcon sx={{ mb: 0.5 }} />
                      <Typography variant="caption">Twitter</Typography>
                    </Paper>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        borderRadius: 2,
                        bgcolor: "rgba(24, 119, 242, 0.1)",
                        color: "#1877F2",
                        cursor: "pointer",
                        "&:hover": { bgcolor: "rgba(24, 119, 242, 0.2)" },
                      }}
                      onClick={() =>
                        window.open(
                          "https://www.facebook.com/sharer/sharer.php?u=" +
                            shareUrl,
                          "_blank"
                        )
                      }
                    >
                      <FacebookIcon sx={{ mb: 0.5 }} />
                      <Typography variant="caption">Facebook</Typography>
                    </Paper>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        borderRadius: 2,
                        bgcolor: "rgba(10, 102, 194, 0.1)",
                        color: "#0A66C2",
                        cursor: "pointer",
                        "&:hover": { bgcolor: "rgba(10, 102, 194, 0.2)" },
                      }}
                      onClick={() =>
                        window.open("https://www.instagram.com/", "_blank")
                      }
                    >
                      <InstagramIcon sx={{ mb: 0.5 }} />
                      <Typography variant="caption">Instagram</Typography>
                    </Paper>
                  </Box>
                </Paper>
              </motion.div>
              {post.tags && post.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      background:
                        "linear-gradient(to bottom right, rgba(238, 242, 255, 0.8), rgba(254, 242, 254, 0.8))",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <LocalOfferIcon
                        sx={{ fontSize: "1rem", color: "primary.main", mr: 1 }}
                      />
                      Tags
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {post.tags.map((tag) => (
                        <Chip
                          key={tag.id}
                          label={tag.name}
                          icon={<LocalOfferIcon sx={{ fontSize: "0.75rem" }} />}
                          sx={{
                            bgcolor: "background.paper",
                            color: "primary.main",
                            fontWeight: 500,
                            "&:hover": {
                              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Paper>
                </motion.div>
              )}
              {post.author && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      background:
                        "linear-gradient(to bottom right, rgba(238, 242, 255, 0.8), rgba(254, 242, 254, 0.8))",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                      About the Author
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          mb: 1.5,
                          fontWeight: 600,
                          fontSize: "1.5rem",
                          background:
                            "linear-gradient(to bottom right, #4f46e5, #e11d48)",
                        }}
                      >
                        {post.author.full_name.charAt(0)}
                      </Avatar>
                      <Typography variant="h6" fontWeight={600}>
                        {post.author.full_name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        Content creator and specialist in well-being topics.
                        Passionate about helping people unplug and find balance
                        in their lives.
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
      {isVisible && (
        <Box sx={{ position: "fixed", bottom: 4, left: 4, zIndex: 50 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={handleGoBack}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                borderRadius: "9999px",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              Back to Blogs
            </Button>
          </motion.div>
        </Box>
      )}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Box sx={{ mt: 8, pb: 8 }}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              component="h2"
              fontWeight={700}
              gutterBottom
              sx={{
                textAlign: "center",
                mb: 5,
                background: "linear-gradient(to right, #4f46e5, #e11d48)",
                backgroundClip: "text",
                color: "transparent",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Related Articles
            </Typography>
            <Box sx={{ textAlign: "center", color: "text.secondary" }}>
              <Typography>Related articles will appear here...</Typography>
            </Box>
          </Container>
        </Box>
      </motion.div>
    </Box>
  );
};

export default BlogDetail;
