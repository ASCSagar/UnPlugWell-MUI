import React from "react";
import { Divider } from "@mui/material";
import Seo from "../components/layout/Seo";
import Layout from "../components/layout/Layout";
import BlogList from "../components/blog/BlogList";
import Subscribe from "../components/common/Subscribe";

const BlogPage = () => {
  return (
    <Layout>
      <Seo
        title="Digital Detox Blog | UnplugWell - Tips, Insights, and Inspiration"
        description="Stay informed with the UnplugWell blog. Dive into expert articles, personal stories, and practical tips to embrace a balanced, tech-free lifestyle."
        canonicalUrl="/blog"
      />
      <BlogList
        title="Digital Wellbeing Blog"
        subtitle="Insights, tips and strategies for a balanced digital lifestyle"
      />
      <Divider sx={{ my: 8 }} />
      <Subscribe variant="boxed" />
    </Layout>
  );
};

export default BlogPage;
