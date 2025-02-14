
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

  const templateId = searchParams.get("template");
  const pageId = searchParams.get("pageId");

  // Load existing content when editing a page
  useEffect(() => {
    if (pageId) {
      const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
      const mockAndStoredPages = [...mockPages, ...storedPages];
      const pageToEdit = mockAndStoredPages.find(p => p.id === Number(pageId));
      
      if (pageToEdit) {
        const headerElement = document.querySelector('h1');
        if (headerElement) {
          headerElement.textContent = `Editing: ${pageToEdit.title}`;
        }
        // Load the page's content if it exists
        if (pageToEdit.content) {
          setContent(pageToEdit.content);
        }
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
      
      if (pageId) {
        // Update existing page
        const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
        const pageIndex = storedPages.findIndex((p: any) => p.id === Number(pageId));
        
        if (pageIndex !== -1) {
          // Update existing page
          storedPages[pageIndex] = {
            ...storedPages[pageIndex],
            content,
            lastModified: new Date().toISOString().split('T')[0]
          };
        } else {
          // If not found in stored pages, check mock pages
          const mockPageIndex = mockPages.findIndex(p => p.id === Number(pageId));
          if (mockPageIndex !== -1) {
            // Create a new stored page based on the mock page
            storedPages.push({
              ...mockPages[mockPageIndex],
              id: Number(pageId),
              content,
              lastModified: new Date().toISOString().split('T')[0]
            });
          }
        }
        
        localStorage.setItem('pages', JSON.stringify(storedPages));
      }

      setLastSaved(new Date());
      setIsDirty(false);
      toast.success("Changes saved successfully!");
    } catch (error) {
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
    handleContentChange,
    handleSave
  };
}
