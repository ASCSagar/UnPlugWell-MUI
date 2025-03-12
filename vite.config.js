import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import sitemap from "vite-plugin-sitemap";
import axios from "axios";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      manifest: {
        name: "UnplugWell",
        short_name: "UnplugWell",
        description: "UnplugWell Progressive Web App",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/unplugwellOne.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
    sitemap({
      hostname: "https://unplugwell.com/",
      urls: async () => {
        const staticPages = [
          { url: "/", priority: 1.0 },
          { url: "/blog", priority: 0.9 },
          { url: "/about", priority: 0.8 },
          { url: "/contact", priority: 0.8 },
          { url: "/privacy-policy", priority: 0.7 },
          { url: "/terms-of-service", priority: 0.7 },
          { url: "/cookie-policy", priority: 0.7 },
          { url: "/disclaimer", priority: 0.7 },
        ];

        try {
          const blogResponse = await axios.get(
            "https://unplugwell.com/blog/api/all-posts/?site_domain=unplugwell.com"
          );
          const blogPosts = blogResponse.data.results.map((post) => ({
            url: `/blog/${encodeURIComponent(post.slug)}`,
            lastmod: new Date().toISOString(),
            changefreq: "daily",
            priority: 0.9,
          }));

          const allUrls = [...staticPages, ...blogPosts];
          return allUrls;
        } catch (error) {
          return staticPages;
        }
      },
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    minify: "esbuild",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
