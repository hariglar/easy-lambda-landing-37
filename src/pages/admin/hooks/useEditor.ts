
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { TemplateContent, defaultContent } from "../types/editor";
import { mockPages } from "../data/mockData";
import { toast } from "sonner";

export function useEditor() {
  const [searchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState("design");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [metaExpanded, setMetaExpanded] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date());
  const [content, setContent] = useState<TemplateContent>(defaultContent);
  const [isDirty, setIsDirty] = useState(false);
  const [pageTitle, setPageTitle] = useState("New Page");

  const templateId = searchParams.get("template");
  const pageId = searchParams.get("pageId");

  // Load existing content when editing a page
  useEffect(() => {
    if (pageId) {
      console.log('Loading content for pageId:', pageId);
      const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
      
      // First check stored pages
      const storedPage = storedPages.find(p => p.id === Number(pageId));
      if (storedPage) {
        console.log('Found stored page:', storedPage);
        if (storedPage.content) {
          setContent(storedPage.content);
        }
        setPageTitle(storedPage.title);
        return;
      }
      
      // If not found in stored pages, check mock pages
      const mockPage = mockPages.find(p => p.id === Number(pageId));
      if (mockPage) {
        setPageTitle(mockPage.title);
        // For mock pages, we might need to initialize their content
        const mockPageContent = mockPage.content || defaultContent;
        console.log('Using mock page content:', mockPageContent);
        setContent(mockPageContent);
      }
    }
  }, [pageId]);

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

  const handleSave = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
      const currentDate = new Date().toISOString().split('T')[0];

      if (pageId) {
        // Always create or update in storedPages
        const pageIndex = storedPages.findIndex((p: any) => p.id === Number(pageId));
        
        if (pageIndex !== -1) {
          // Update existing stored page
          console.log('Updating existing stored page:', pageId);
          storedPages[pageIndex] = {
            ...storedPages[pageIndex],
            title: pageTitle,
            content,
            lastModified: currentDate
          };
        } else {
          // Create new stored page, either from mock or as new
          const mockPage = mockPages.find(p => p.id === Number(pageId));
          console.log('Creating new stored page from mock:', mockPage);
          storedPages.push({
            ...(mockPage || {
              id: Number(pageId),
              status: "draft",
              url: `/page-${pageId}`,
              views: 0
            }),
            title: pageTitle,
            content,
            lastModified: currentDate
          });
        }
      } else {
        // Create completely new page
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
          url: `/page-${newPageId}`,
          content,
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
  };

  return {
    currentTab,
    setCurrentTab,
    selectedTemplate,
    setSelectedTemplate,
    metaExpanded,
    setMetaExpanded,
    lastSaved,
    content,
    isDirty,
    templateId,
    pageTitle,
    setPageTitle,
    handleContentChange,
    handleSave
  };
}
