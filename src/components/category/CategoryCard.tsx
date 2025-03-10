import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";
import { Category } from "../../types";

// This maps category slugs to background images
// In a real application, you might have images in the API
const categoryImages: Record<string, string> = {
  "digital-detox":
    "https://source.unsplash.com/random/600x400/?digital,minimal",
  "mental-health": "https://source.unsplash.com/random/600x400/?wellness,mind",
  mindfullness: "https://source.unsplash.com/random/600x400/?meditation,zen",
  "social-media-detox":
    "https://source.unsplash.com/random/600x400/?social,media",
  "health-wellness": "https://source.unsplash.com/random/600x400/?health,yoga",
  "social-connection":
    "https://source.unsplash.com/random/600x400/?connection,people",
  "travel-leisure": "https://source.unsplash.com/random/600x400/?travel,relax",
  "family-travel": "https://source.unsplash.com/random/600x400/?family,nature",
  "career-advice": "https://source.unsplash.com/random/600x400/?career,office",
  "lifestyle-challenges":
    "https://source.unsplash.com/random/600x400/?lifestyle,challenge",
};

interface CategoryCardProps {
  category: Category;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => {
  const theme = useTheme();

  // Get the background image for this category or use a default
  const backgroundImage =
    categoryImages[category.slug] ||
    `https://source.unsplash.com/random/600x400/?wellness&${category.id}`;

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: "0 16px 30px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)",
          },
        }}
      />

      <CardContent
        sx={{
          position: "relative",
          zIndex: 1,
          color: "white",
          mt: "auto",
          p: 3,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 600, mb: 1 }}
        >
          {category.name}
        </Typography>

        <Typography
          variant="body2"
          component="p"
          sx={{
            mb: 2,
            opacity: 0.9,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {category.description ||
            `Explore articles about ${category.name} for a balanced digital lifestyle.`}
        </Typography>

        <Button
          component={RouterLink}
          to={`/category/${category.slug}`}
          variant="outlined"
          color="inherit"
          endIcon={<ArrowForwardIcon />}
          size="small"
          sx={{
            borderColor: "white",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderColor: "white",
            },
          }}
        >
          View Articles
        </Button>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
