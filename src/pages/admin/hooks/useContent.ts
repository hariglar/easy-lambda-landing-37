
import { useState, useCallback } from "react";
import { TemplateContent, defaultContent } from "../types/editor";
import { toast } from "sonner";
import { mockPages } from "../data/mockData";

export function useContent(pageId: string | null) {
  const [content, setContent] = useState<TemplateContent>(defaultContent);
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date());
  const [pageTitle, setPageTitle] = useState("New Page");
  const [pageUrl, setPageUrl] = useState("/new-page");

  const handleContentChange = (
    section: keyof TemplateContent,
    value: any,
    index?: number,
    field?: string
  ) => {
    console.log('Content changed, setting isDirty to true');
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

      if (pageId) {
        const pageIndex = storedPages.findIndex((p: any) => p.id === Number(pageId));
        
        if (pageIndex !== -1) {
          console.log('Updating existing stored page:', pageId);
          storedPages[pageIndex] = {
            ...storedPages[pageIndex],
            title: pageTitle,
            url: pageUrl,
            content,
            lastModified: currentDate
          };
        } else {
          const mockPage = mockPages.find(p => p.id === Number(pageId));
          console.log('Creating new stored page from mock:', mockPage);
          storedPages.push({
            ...(mockPage || {
              id: Number(pageId),
              status: "draft",
              views: 0
            }),
            title: pageTitle,
            url: pageUrl,
            content,
            lastModified: currentDate
          });
        }
      } else {
        const newPageId = Math.max(
          ...storedPages.map((p: any) => p.id),
          ...mockPages.map(p => p.id),
          0
        ) + 1;
        console.log('Creating completely new page:', newPageId);
        storedPages.push({
          id: newPageId,
          title: pageTitle,
          status: "draft",
          url: pageUrl,
          content,
          lastModified: currentDate,
          views: 0
        });
      }
      
      localStorage.setItem('pages', JSON.stringify(storedPages));
      
      // Store the current content in sessionStorage for preview
      sessionStorage.setItem('previewData', JSON.stringify(content));
      
      setLastSaved(new Date());
      setIsDirty(false);
      toast.success("Changes saved successfully!");
      
      console.log('Saved pages:', storedPages);
    } catch (error) {
      console.error('Save error:', error);
      toast.error("Failed to save changes. Please try again.");
    }
  }, [pageId, pageTitle, pageUrl, content]);

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
    handleSave
  };
}
