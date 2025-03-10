import axios from "axios";
import { BlogPost, Category } from "../types";

const API_BASE_URL = "https://unplugwell.com/blog/api";
const SITE_DOMAIN = "unplugwell.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchLatestPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await api.get(`/posts-latest/?site_domain=${SITE_DOMAIN}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    return [];
  }
};

export const fetchPopularPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await api.get(
      `/posts-popular/?site_domain=${SITE_DOMAIN}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular posts:", error);
    return [];
  }
};

export const fetchCategoriess = async () => {
  const response = await axios.get(
    "https://unplugwell.com/blog/api/get-categories/?site=unplugwell.com"
  );
  return response.data.results; // or response.data, depending on the API structure
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get(`/get-categories/?site=${SITE_DOMAIN}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const fetchPostBySlug = async (
  slug: string
): Promise<BlogPost | null> => {
  try {
    const response = await api.get(`/post/${slug}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
};

export const fetchPostsByCategory = async (
  categorySlug: string,
  page = 1
): Promise<{ posts: BlogPost[]; totalPages: number }> => {
  try {
    const response = await api.get(
      `/posts/?site_domain=${SITE_DOMAIN}&category=${categorySlug}&page=${page}`
    );
    return {
      posts: response.data.results,
      totalPages: Math.ceil(response.data.count / 10), // Assuming 10 posts per page
    };
  } catch (error) {
    console.error(`Error fetching posts for category ${categorySlug}:`, error);
    return { posts: [], totalPages: 0 };
  }
};

export const fetchAllPosts = async (
  page = 1
): Promise<{ posts: BlogPost[]; totalPages: number }> => {
  try {
    const response = await api.get(
      `/posts/?site_domain=${SITE_DOMAIN}&page=${page}`
    );
    return {
      posts: response.data.results,
      totalPages: Math.ceil(response.data.count / 10), // Assuming 10 posts per page
    };
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return { posts: [], totalPages: 0 };
  }
};

export const searchPosts = async (query: string): Promise<BlogPost[]> => {
  try {
    const response = await api.get(
      `/posts/?site_domain=${SITE_DOMAIN}&search=${query}`
    );
    return response.data.results;
  } catch (error) {
    console.error(`Error searching posts with query ${query}:`, error);
    return [];
  }
};

export default api;
