// src/utils/formatDate.ts
export const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };
  
  // src/utils/readingTime.ts
  export const calculateReadingTime = (content: string): number => {
    // Remove HTML tags
    const plainText = content.replace(/<[^>]*>/g, '');
    // Count words (approximately)
    const words = plainText.split(/\s+/).filter(word => word.length > 0);
    // Average reading speed: 200 words per minute
    const readingTimeMinutes = Math.ceil(words.length / 200);
    return readingTimeMinutes > 0 ? readingTimeMinutes : 1;
  };
  
  // src/utils/generateTableOfContents.ts
  import { TableOfContentsItem } from '../types';
  
  export const generateTableOfContents = (htmlContent: string): TableOfContentsItem[] => {
    const toc: TableOfContentsItem[] = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Select all heading elements (h1, h2, h3, h4, h5, h6)
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    headings.forEach((heading, index) => {
      // Get heading level (h1 -> 1, h2 -> 2, etc.)
      const level = parseInt(heading.tagName.substring(1), 10);
      
      // Get heading text
      const text = heading.textContent || '';
      
      // Generate a unique ID
      const id = `heading-${index}`;
      
      // Add ID to the heading element for scroll linking
      heading.setAttribute('id', id);
      
      // Create TOC item
      const tocItem: TableOfContentsItem = {
        id,
        text,
        level,
      };
      
      toc.push(tocItem);
    });
    
    return toc;
  };
  
  // Export a function to convert HTML to plain text (for meta descriptions etc.)
  export const htmlToPlainText = (html: string): string => {
    const tempDom = document.createElement('div');
    tempDom.innerHTML = html;
    const text = tempDom.textContent || tempDom.innerText || '';
    return text.trim();
  };
  
  // Export a function to truncate text for excerpts
  export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };