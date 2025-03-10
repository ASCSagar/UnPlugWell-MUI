export interface Author {
    id: number;
    full_name: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    meta_title?: string;
    meta_description?: string;
    show_in_menu?: boolean;
    master_category?: {
      id: number;
      name: string;
      slug: string;
      description?: string;
    };
  }
  
  export interface Tag {
    id: number;
    name: string;
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
  
  export interface TableOfContentsItem {
    id: string;
    text: string;
    level: number;
    children?: TableOfContentsItem[];
  }