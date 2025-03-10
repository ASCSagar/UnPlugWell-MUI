import React from "react";
import { Box, Typography, Grid, Button, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ExploreIcon from "@mui/icons-material/Explore";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link as RouterLink } from "react-router-dom";
import LatestBlogs from "./LatestBlogs";
import PopularBlogs from "./PopularBlogs";

interface FeaturedContentProps {
  isMobile?: boolean;
}

const FeaturedContent = ({ isMobile }: FeaturedContentProps) => {
  const theme = useTheme();

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <Box
      component={motion.div}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      sx={{
        mt: -8,
        mb: 10,
        px: { xs: 2, md: 4 },
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box
            sx={{
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(30, 41, 59, 0.8)"
                  : "rgba(255, 255, 255, 0.8)",
              borderRadius: 4,
              p: 4,
              mb: 4,
              backdropFilter: "blur(10px)",
              border: "1px solid",
              borderColor:
                theme.palette.mode === "dark"
                  ? "rgba(99, 102, 241, 0.2)"
                  : "rgba(99, 102, 241, 0.2)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <AutoAwesomeIcon sx={{ color: "#6366f1", mr: 1 }} />
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 600,
                  color: "#6366f1",
                  letterSpacing: 1.2,
                }}
              >
                FEATURED CONTENT
              </Typography>
            </Box>

            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: "2rem", md: "2.5rem" },
                backgroundImage: "linear-gradient(90deg, #6366f1, #a855f7)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              Explore Digital Wellbeing Resources
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: "md",
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              Discover our curated collection of articles, guides, and insights
              to help you find balance in your digital life. Whether you're
              looking for the latest tips or our most popular content, we've got
              you covered.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <BlogSection
            to="/blog"
            title="Latest Insights"
            icon={<TrendingUpIcon sx={{ color: "#6366f1", mr: 1.5 }} />}
            component={<LatestBlogs title="" subtitle="" limit={3} />}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <BlogSection
            to="/blog"
            title="Popular Content"
            icon={<ExploreIcon sx={{ color: "#ec4899", mr: 1.5 }} />}
            component={<PopularBlogs title="" subtitle="" limit={3} />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

interface BlogSectionProps {
  icon: React.ReactNode;
  title: string;
  to: string;
  component: React.ReactNode;
}

const BlogSection = ({ icon, title, to, component }: BlogSectionProps) => {
  const theme = useTheme();
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <Box
      component={motion.div}
      variants={fadeInUp}
      sx={{
        height: "100%",
        bgcolor:
          theme.palette.mode === "dark"
            ? "rgba(30, 41, 59, 0.7)"
            : "rgba(255, 255, 255, 0.7)",
        borderRadius: 4,
        backdropFilter: "blur(10px)",
        border: "1px solid",
        borderColor:
          theme.palette.mode === "dark"
            ? "rgba(99, 102, 241, 0.2)"
            : "rgba(99, 102, 241, 0.2)",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid",
          borderColor:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {icon}
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
        </Box>
        <Button
          component={RouterLink}
          to={to}
          variant="text"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          sx={{ fontWeight: 600 }}
        >
          View All
        </Button>
      </Box>

      <Box sx={{ p: 3, flexGrow: 1 }}>{component}</Box>
    </Box>
  );
};

export default FeaturedContent;