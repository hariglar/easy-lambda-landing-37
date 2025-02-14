
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EcommerceLanding from './admin/templates/EcommerceLanding';
import { TemplateContent } from './admin/types/editor';
import NotFound from './NotFound';

export default function Preview() {
  const location = useLocation();
  const [content, setContent] = useState<TemplateContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Remove /preview from the pathname to get the actual page URL
      const pageUrl = location.pathname.replace('/preview', '');
      console.log('Looking for page with URL:', pageUrl);
      
      // Load the page content from localStorage
      const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
      console.log('Stored pages:', storedPages);
      
      // Find the page, ensuring URL comparison is normalized
      const currentPage = storedPages.find((p: any) => {
        // Normalize both URLs by ensuring they start with / and trimming any trailing spaces
        const storedUrl = p.url.trim();
        const normalizedStoredUrl = storedUrl.startsWith('/') ? storedUrl : `/${storedUrl}`;
        const normalizedPageUrl = pageUrl.trim();
        
        console.log('Comparing URLs:', {
          normalizedStoredUrl,
          normalizedPageUrl,
          match: normalizedStoredUrl === normalizedPageUrl
        });
        
        return normalizedStoredUrl === normalizedPageUrl;
      });
      
      if (currentPage?.content) {
        console.log('Found page:', currentPage);
        setContent(currentPage.content);
      } else {
        console.log('Page not found');
        setError('Page not found');
      }
    } catch (err) {
      console.error('Error loading page:', err);
      setError('Failed to load page content');
    } finally {
      setIsLoading(false);
    }
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error || !content) {
    return <NotFound />;
  }

  return <EcommerceLanding content={content} />;
}
