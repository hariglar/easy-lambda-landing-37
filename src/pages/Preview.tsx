
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EcommerceLanding from './admin/templates/EcommerceLanding';
import { TemplateContent } from './admin/types/editor';

export default function Preview() {
  const { "*": pageUrl } = useParams();
  const [content, setContent] = useState<TemplateContent | null>(null);

  useEffect(() => {
    // Load the page content from localStorage
    const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
    const currentPage = storedPages.find((p: any) => p.url === `/${pageUrl}`);
    
    if (currentPage?.content) {
      setContent(currentPage.content);
    }
  }, [pageUrl]);

  if (!content) {
    return <div>Loading...</div>;
  }

  return <EcommerceLanding content={content} />;
}
