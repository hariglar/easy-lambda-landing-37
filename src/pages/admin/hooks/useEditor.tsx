
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";
import { mockPages } from "../data/mockData";
import { useContent } from "./useContent";
import { isUrlUnique } from "../utils/urlUtils";
import { defaultContent } from "../types/editor";

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
    setContent,
    templateType,
    setTemplateType
  } = useContent(pageId);

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
  }, [pageId, templateId, setContent, setPageTitle, setPageUrl, setTemplateType]);

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
