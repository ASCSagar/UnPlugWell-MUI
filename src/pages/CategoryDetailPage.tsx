import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  CardActionArea,
  Grid,
} from "@mui/material";
import { AccessTime, Search } from "@mui/icons-material";
import moment from "moment";
import { useParams } from "react-router-dom";
import Seo from "../components/layout/Seo";
import Layout from "../components/layout/Layout";

interface Blog {
  slug: string;
  title: string;
  excerpt: string;
  featured_image: string;
  image_alt: string;
  published_at: string;
  author: {
    full_name: string;
  };
}

const CategoriesBlogs: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      if (!slug) return;
      try {
        const response = await axios.get(
          `https://unplugwell.com/blog/api/posts-category/?site_domain=unplugwell.com&category_slug=${slug}`
        );
        setRelatedBlogs(response.data.results);
        setFilteredBlogs(response.data.results);
      } catch (error) {
        console.error("Error fetching blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRelatedBlogs();
  }, [slug]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = relatedBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(relatedBlogs);
    }
  }, [searchQuery, relatedBlogs]);

  return (
    <Layout>
      <Seo
        title="Categories"
        description="Discover focused content across various aspects of digital wellness"
        canonicalUrl="/categories/"
      />
      <Container sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom textAlign="center">
          {slug
            ?.replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
          Blogs
        </Typography>
        <Typography
          variant="subtitle1"
          textAlign="center"
          color="textSecondary"
          gutterBottom
        >
          Discover insights and strategies for maintaining digital wellness in
          today's connected world.
        </Typography>
        <TextField
          fullWidth
          placeholder="Search blogs..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{ startAdornment: <Search color="disabled" /> }}
          sx={{ mb: 4 }}
        />
        {loading ? (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : filteredBlogs.length > 0 ? (
          <Grid container spacing={3}>
            {filteredBlogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog.slug}>
                <Card>
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
                    <CardMedia
                      component="img"
                      height="180"
                      image={blog.featured_image}
                      alt={blog.image_alt}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {blog.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        {blog.excerpt}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AccessTime fontSize="small" />{" "}
                        {moment(blog.published_at).startOf("hour").fromNow()}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        sx={{ mt: 1 }}
                      >
                        By {blog.author.full_name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography textAlign="center" color="textSecondary">
            No Blogs Available.
          </Typography>
        )}
      </Container>
    </Layout>
  );
};

export default CategoriesBlogs;
