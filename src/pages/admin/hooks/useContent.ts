
import { useState, useCallback } from "react";
import { TemplateContent, defaultContent } from "../types/editor";
import { toast } from "sonner";
import { mockPages } from "../data/mockData";

export function useContent(pageId: string | null) {
  const [content, setContent] = useState<TemplateContent>(defaultContent);
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [pageTitle, setPageTitle] = useState("New Page");
  const [pageUrl, setPageUrl] = useState("/new-page");

  const handleContentChange = useCallback((
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
  }, []);

  const handleSave = useCallback(async () => {
    try {
      const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
      const currentDate = new Date();

      if (pageId) {
        const pageIndex = storedPages.findIndex((p: any) => p.id === Number(pageId));
        
        if (pageIndex !== -1) {
          storedPages[pageIndex] = {
            ...storedPages[pageIndex],
            title: pageTitle,
            url: pageUrl,
            content,
            lastModified: currentDate.toISOString().split('T')[0]
          };
        } else {
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
            lastModified: currentDate.toISOString().split('T')[0]
          });
        }
      } else {
        const newPageId = Math.max(
          ...storedPages.map((p: any) => p.id),
          0
        ) + 1;

        storedPages.push({
          id: newPageId,
          title: pageTitle,
          status: "draft",
          url: pageUrl,
          content,
          lastModified: currentDate.toISOString().split('T')[0],
          views: 0
        });
      }
      
      localStorage.setItem('pages', JSON.stringify(storedPages));
      setLastSaved(currentDate);
      setIsDirty(false);
      toast.success("Changes saved successfully!");
    } catch (error) {
      console.error('Save error:', error);
      toast.error("Failed to save changes. Please try again.");
      throw error;
    }
  }, [content, pageId, pageTitle, pageUrl]);

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
