import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Divider } from "@mui/material";
import Layout from "../components/layout/Layout";
import Seo from "../components/layout/Seo";
import BlogList from "../components/blog/BlogList";
import SearchBar from "../components/common/SearchBar";

const SearchResultsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";

  return (
    <Layout>
      <Seo
        title={`Search results for "${query}" - UnplugWell`}
        description={`Explore articles related to "${query}" on UnplugWell - digital detox, mindfulness, and balanced technology use.`}
        canonicalUrl={`/search?q=${encodeURIComponent(query)}`}
      />

      <Box sx={{ mb: 6 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Search Results
          </Typography>
          {query ? (
            <Typography variant="subtitle1" color="text.secondary">
              Showing results for "{query}"
            </Typography>
          ) : (
            <Typography variant="subtitle1" color="text.secondary">
              Please enter a search term
            </Typography>
          )}
        </Box>

        <Box sx={{ maxWidth: 600, mx: "auto", mb: 5 }}>
          <SearchBar placeholder="Refine your search..." fullWidth />
        </Box>

        <Divider sx={{ mb: 6 }} />

        {query ? (
          <BlogList currentPage={1} searchQuery={query} title="" subtitle="" />
        ) : (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography variant="h5" gutterBottom>
              No search term provided
            </Typography>
            <Typography variant="body1">
              Please enter a keyword or phrase to search our articles.
            </Typography>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default SearchResultsPage;
