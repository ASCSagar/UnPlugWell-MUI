export interface Author {
    id: number;
    full_name: string;
  }
  
  export interface Tag {
    id: number;
    name: string;
  }

  export interface Category {
    id: number;
    name?: string;
    slug: string;
  }

  export interface Blogs {
    id: number;
    featured_image: string;
    image_alt: string;
    slug: string;
    title: string;
    excerpt: string;
    published_at: string;
    author: Author;
    category: Category;
    estimated_reading_time: number;
    view_count: string;
    content: string;
    tags: Tag[];
    meta_title: string;
    meta_description: string;
  }
  
  export interface BlogPostSummary {
    id: number;
    featured_image: string;
    image_alt: string;
    slug: string;
    title: string;
    excerpt: string;
    published_at: string;
    author: Author;
    category: {
      id: number;
      name?: string;
      slug: string;
    };
    estimated_reading_time: number;
    view_count: string;
  }
  
  export interface BlogPost extends BlogPostSummary {
    content: string;
    tags: Tag[];
    meta_title: string;
    meta_description: string;
  }