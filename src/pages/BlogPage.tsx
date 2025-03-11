import React from "react";
import Seo from "../components/layout/Seo";
import Layout from "../components/layout/Layout";
import BlogList from "../components/blog/BlogList";

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
    </Layout>
  );
};

export default BlogPage;
