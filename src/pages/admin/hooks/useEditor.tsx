import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { TemplateContent, defaultContent } from "../types/editor";
import { mockPages } from "../data/mockData";
import { toast } from "sonner";
import { X } from "lucide-react";

export function useEditor() {
  const [searchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState("design");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [metaExpanded, setMetaExpanded] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date());
  const [content, setContent] = useState<TemplateContent>(defaultContent);
  const [isDirty, setIsDirty] = useState(false);
  const [pageTitle, setPageTitle] = useState("New Page");
  const [pageUrl, setPageUrl] = useState("/new-page");

  const templateId = searchParams.get("template");
  const pageId = searchParams.get("pageId");

  const isUrlUnique = (url: string, currentPageId: number | null) => {
    const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
    const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
    
    return !storedPages.some((page: any) => {
      // Skip checking against the current page
      if (currentPageId && page.id === currentPageId) {
        return false;
      }
      return page.url === normalizedUrl;
    });
  };

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
        setPageUrl(storedPage.url);
        return;
      }
      
      // If not found in stored pages, check mock pages
      const mockPage = mockPages.find(p => p.id === Number(pageId));
      if (mockPage) {
        setPageTitle(mockPage.title);
        setPageUrl(mockPage.url);
        // For mock pages, initialize with default content
        setContent(defaultContent);
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
      const currentPageId = pageId ? Number(pageId) : null;
      
      if (!isUrlUnique(pageUrl, currentPageId)) {
        toast.error("This URL is already in use by another page.", {
          description: "Please choose a different URL.",
          action: {
            label: <X className="h-4 w-4" />,
            onClick: () => toast.dismiss()
          }
        });
        return;
      }

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
            url: pageUrl,
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
              views: 0
            }),
            title: pageTitle,
            url: pageUrl,
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
          url: pageUrl,
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
      toast.error("Failed to save changes.", {
        description: "Please try again.",
        action: {
          label: <X className="h-4 w-4" />,
          onClick: () => toast.dismiss()
        }
      });
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
    setIsDirty,
    templateId,
    pageTitle,
    setPageTitle,
    pageUrl,
    setPageUrl,
    handleContentChange,
    handleSave
  };
}
