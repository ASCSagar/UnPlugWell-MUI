import axios from "axios";
import React, { useEffect, useState } from "react";
import { Blogs } from "../../types";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link as RouterLink } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import moment from "moment";

const RelatedBlog = ({ category }) => {
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState<Blogs[]>([]);

  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      if (!category) return;
      try {
        const response = await axios.get(
          `https://unplugwell.com/blog/api/posts-category/?site_domain=unplugwell.com&category_slug=${category}`
        );

        setRelatedBlogs(response.data.results);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedBlogs();
  }, [category]);

  // Dynamically adjust slidesToShow based on the number of blogs
  const getSlidesToShow = () => {
    if (relatedBlogs.length === 1) return 1;
    if (relatedBlogs.length === 2) return 2;
    return 3;
  };

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: relatedBlogs.length > 1, // Disable infinite scroll if only 1 blog
    speed: 500,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    autoplay: relatedBlogs.length > 1, // Disable autoplay if only 1 blog
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, getSlidesToShow()),
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", mt: 4, px: 2 }}>
      <Slider {...sliderSettings}>
        {relatedBlogs.map((blog) => (
          <Box key={blog.id} sx={{ padding: 1 }}>
            <Paper
              component={RouterLink}
              to={`/blog/${blog.slug}`}
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: "column",
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
              {/* Image Section */}
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  className="thumbnail-img"
                  src={blog.featured_image}
                  alt={blog.image_alt}
                  sx={{
                    width: "100%",
                    height: "200px",
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
                    {parseInt(blog.view_count).toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              {/* Details Section */}
              <Box sx={{ p: 3 }}>
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
                    {blog.category.name}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {moment(blog.published_at).format("MMMM DD, YYYY")}
                  </Typography>
                </Box>

                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  {blog.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {blog.excerpt}
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
                    By {blog.author.full_name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    {blog.estimated_reading_time} min read
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default RelatedBlog;
