
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
      
      // Load the page content from localStorage
      const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
      const currentPage = storedPages.find((p: any) => p.url === pageUrl);
      
      if (currentPage?.content) {
        setContent(currentPage.content);
      } else {
        setError('Page not found');
      }
    } catch (err) {
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
