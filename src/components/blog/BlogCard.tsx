import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import moment from "moment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { BlogPostSummary } from "../../types";

interface BlogCardProps {
  post: BlogPostSummary;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  return (
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
        to={`/blog/${post.slug}`}
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
            image={post.featured_image}
            alt={post.image_alt}
            sx={{
              height: featured ? 300 : 200,
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
            {post.category.name || post.category.slug}
          </Box>
        </Box>

        <CardContent
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Typography
            gutterBottom
            variant={featured ? "h5" : "h6"}
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
            {post.title}
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
            {post.excerpt}
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
                src={`https://source.unsplash.com/random/100x100/?portrait&${post.author.id}`}
                alt={post.author.full_name}
                sx={{ width: 24, height: 24, mr: 1 }}
              />
              <Typography variant="caption" color="text.secondary">
                {post.author.full_name}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccessTimeIcon
                sx={{ fontSize: 14, mr: 0.5, color: "text.secondary" }}
              />
              <Typography variant="caption" color="text.secondary">
                {post.estimated_reading_time} min read
              </Typography>
            </Box>
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            {moment(post.published_at).format("MMMM DD, YYYY")}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BlogCard;
