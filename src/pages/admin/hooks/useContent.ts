
import { useState, useCallback, useEffect } from "react";
import { TemplateContent, defaultContent } from "../types/editor";
import { toast } from "sonner";
import { mockPages } from "../data/mockData";

export function useContent(pageId: string | null) {
  const [content, setContent] = useState<TemplateContent>(defaultContent);
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date());
  const [pageTitle, setPageTitle] = useState("New Page");
  const [pageUrl, setPageUrl] = useState("/new-page");
  const [templateType, setTemplateType] = useState(() => {
    // Initialize template type from URL params
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('template') || 'ecommerce';
  });

  // Update template type when URL changes
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const newTemplateType = urlParams.get('template');
    if (newTemplateType) {
      setTemplateType(newTemplateType);
    }
  }, [window.location.search]);

  const handleContentChange = (
    section: keyof TemplateContent,
    value: any,
    index?: number,
    field?: string
  ) => {
    setIsDirty(true);
    setContent(prev => {
      const newContent = { ...prev };
      if (index !== undefined && field && Array.isArray(newContent[section])) {
        (newContent[section] as any[])[index] = {
          ...(newContent[section] as any[])[index],
          [field]: value
        };
      } else if (typeof value === "object") {
        newContent[section] = { ...newContent[section], ...value };
      } else {
        newContent[section] = value;
      }
      return newContent;
    });
  };

  const handleSave = useCallback(async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
      const currentDate = new Date().toISOString().split('T')[0];

      console.log('Saving with template type:', templateType);

      if (pageId) {
        const pageIndex = storedPages.findIndex((p: any) => p.id === Number(pageId));
        
        if (pageIndex !== -1) {
          console.log('Updating existing page with template:', templateType);
          storedPages[pageIndex] = {
            ...storedPages[pageIndex],
            title: pageTitle,
            url: pageUrl,
            content,
            templateType,
            lastModified: currentDate
          };
        } else {
          console.log('Creating new page from existing ID with template:', templateType);
          const mockPage = mockPages.find(p => p.id === Number(pageId));
          storedPages.push({
            ...(mockPage || {
              id: Number(pageId),
              status: "draft",
              views: 0
            }),
            title: pageTitle,
            url: pageUrl,
            content,
            templateType,
            lastModified: currentDate
          });
        }
      } else {
        const newPageId = Math.max(
          ...storedPages.map((p: any) => p.id),
          ...mockPages.map(p => p.id),
          0
        ) + 1;
        console.log('Creating new page with template:', templateType);
        storedPages.push({
          id: newPageId,
          title: pageTitle,
          status: "draft",
          url: pageUrl,
          content,
          templateType,
          lastModified: currentDate,
          views: 0
        });
      }
      
      localStorage.setItem('pages', JSON.stringify(storedPages));
      setLastSaved(new Date());
      setIsDirty(false);
      toast.success("Changes saved successfully!");
      
      console.log('Saved pages:', storedPages);
    } catch (error) {
      console.error('Save error:', error);
      toast.error("Failed to save changes. Please try again.");
    }
  }, [pageId, pageTitle, pageUrl, content, templateType]);

  return {
    content,
    setContent,
    isDirty,
    setIsDirty,
    lastSaved,
    pageTitle,
    setPageTitle,
    pageUrl,
    setPageUrl,
    handleContentChange,
    handleSave,
    templateType,
    setTemplateType
  };
}
