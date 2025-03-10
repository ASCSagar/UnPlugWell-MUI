import fs from "fs";
import axios from "axios";

const API_URL = "https://unplugwell.com/blog/api";
const SITE_URL = "https://unplugwell.com";

async function generateSitemap() {
  try {
    // Fetch posts from the API
    const postsResponse = await axios.get(
      `${API_URL}/posts/?site_domain=unplugwell.com&page_size=100`
    );
    const posts = postsResponse.data.results;

    // Fetch categories from the API
    const categoriesResponse = await axios.get(
      `${API_URL}/get-categories/?site=unplugwell.com`
    );
    const categories = categoriesResponse.data.results;

    // Start building the sitemap
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core pages -->
  <url>
    <loc>${SITE_URL}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/category</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Categories -->`;

    // Add categories to the sitemap
    for (const category of categories) {
      sitemap += `
  <url>
    <loc>${SITE_URL}/category/${category.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }

    // Add posts to the sitemap
    for (const post of posts) {
      sitemap += `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${
      new Date(post.published_at).toISOString().split("T")[0]
    }</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    }

    // Close the sitemap
    sitemap += `
</urlset>`;

    // Write the sitemap to a file
    fs.writeFileSync("./public/sitemap.xml", sitemap);
    console.log("Sitemap generated successfully!");
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }
}

// Execute the function
generateSitemap();
