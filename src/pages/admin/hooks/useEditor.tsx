
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";
import { mockPages } from "../data/mockData";
import { isUrlUnique } from "../utils/urlUtils";
import { defaultContent } from "../types/editor";
import { toast } from "sonner";

interface EditorReturn {
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
  selectedTemplate: number | null;
  setSelectedTemplate: Dispatch<SetStateAction<number | null>>;
  metaExpanded: boolean;
  setMetaExpanded: Dispatch<SetStateAction<boolean>>;
  lastSaved: Date | null;
  content: typeof defaultContent;
  isDirty: boolean;
  setIsDirty: Dispatch<SetStateAction<boolean>>;
  templateId: string;
  pageTitle: string;
  setPageTitle: Dispatch<SetStateAction<string>>;
  pageUrl: string;
  setPageUrl: Dispatch<SetStateAction<string>>;
  handleContentChange: (section: keyof typeof defaultContent, value: any, index?: number, field?: string) => void;
  handleSave: () => Promise<void>;
  isUrlUnique: typeof isUrlUnique;
  templateType: string;
  setTemplateType: Dispatch<SetStateAction<string>>;
}

export function useEditor(): EditorReturn {
  const [searchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState("design");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [metaExpanded, setMetaExpanded] = useState(false);
  const [content, setContent] = useState(defaultContent);
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date());
  const [pageTitle, setPageTitle] = useState("New Page");
  const [pageUrl, setPageUrl] = useState("/new-page");
  const [templateType, setTemplateType] = useState("ecommerce");

  const templateId = searchParams.get("template");
  const pageId = searchParams.get("pageId");

  const handleContentChange = (
    section: keyof typeof defaultContent,
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
      const currentDate = new Date().toISOString().split('T')[0];

      if (pageId) {
        const pageIndex = storedPages.findIndex((p: any) => p.id === Number(pageId));
        
        if (pageIndex !== -1) {
          storedPages[pageIndex] = {
            ...storedPages[pageIndex],
            title: pageTitle,
            url: pageUrl,
            content,
            templateType,
            lastModified: currentDate
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
    } catch (error) {
      console.error('Save error:', error);
      toast.error("Failed to save changes. Please try again.");
    }
  };

  // Load existing content when editing a page
  useEffect(() => {
    if (pageId) {
      console.log('Loading content for pageId:', pageId);
      const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
      
      const storedPage = storedPages.find(p => p.id === Number(pageId));
      if (storedPage) {
        console.log('Found stored page:', storedPage);
        if (storedPage.content) {
          setContent(storedPage.content);
        }
        setPageTitle(storedPage.title);
        setPageUrl(storedPage.url);
        setTemplateType(storedPage.templateType || 'ecommerce');
        return;
      }
      
      const mockPage = mockPages.find(p => p.id === Number(pageId));
      if (mockPage) {
        setPageTitle(mockPage.title);
        setPageUrl(mockPage.url);
        setContent(defaultContent);
        setTemplateType(templateId || 'ecommerce');
      }
    }
  }, [pageId, templateId]);

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
    templateId: templateType,
    pageTitle,
    setPageTitle,
    pageUrl,
    setPageUrl,
    handleContentChange,
    handleSave,
    isUrlUnique,
    templateType,
    setTemplateType
  };
}
