
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { mockPages } from "../data/mockData";
import { useContent } from "./useContent";
import { isUrlUnique } from "../utils/urlUtils";
import { TemplateContent, defaultContent } from "../types/editor";

export function useEditor() {
  const [searchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState("design");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [metaExpanded, setMetaExpanded] = useState(false);

  const templateId = searchParams.get("template");
  const pageId = searchParams.get("pageId");

  const {
    content,
    isDirty,
    setIsDirty,
    lastSaved,
    pageTitle,
    setPageTitle,
    pageUrl,
    setPageUrl,
    handleContentChange,
    handleSave,
    setContent
  } = useContent(pageId);

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
          // Merge the stored content with default content to ensure all new sections exist
          const mergedContent = {
            ...defaultContent,
            ...storedPage.content
          };
          setContent(mergedContent);
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
        setContent(defaultContent);
      }
    }
  }, [pageId, setContent, setPageTitle, setPageUrl]);

  // Memoize the return object to prevent unnecessary re-renders
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
    handleSave,
    isUrlUnique
  };
}
