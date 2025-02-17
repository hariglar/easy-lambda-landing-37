
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { mockPages } from "../data/mockData";
import { TemplateContent, defaultContent } from "../types/editor";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useEditor() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState("design");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [metaExpanded, setMetaExpanded] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date());
  const [content, setContent] = useState<TemplateContent>(defaultContent);
  const [isDirty, setIsDirty] = useState(false);
  const [pageTitle, setPageTitle] = useState("New Page");
  const [pageUrl, setPageUrl] = useState("/new-page");
  const [isPublishing, setIsPublishing] = useState(false);

  const templateId = searchParams.get("template");
  const pageId = searchParams.get("pageId");

  useEffect(() => {
    const loadPage = async () => {
      if (pageId && user) {
        const { data: page, error } = await supabase
          .from('pages')
          .select('*')
          .eq('id', pageId)
          .single();

        if (error) {
          console.error('Error loading page:', error);
          toast.error("Failed to load page");
          return;
        }

        if (page) {
          setContent(page.content as TemplateContent);
          setPageTitle(page.title);
          setPageUrl(page.url);
          return;
        }

        // If not found in database, check mock pages
        const mockPage = mockPages.find(p => p.id === Number(pageId));
        if (mockPage) {
          setPageTitle(mockPage.title);
          setPageUrl(mockPage.url);
          setContent(defaultContent);
        }
      }
    };

    loadPage();
  }, [pageId, user]);

  const handleFileUpload = async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${user?.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('page-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('page-assets')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error: any) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  };

  const handleContentChange = async (
    section: keyof TemplateContent,
    value: any,
    index?: number,
    field?: string
  ) => {
    setIsDirty(true);
    
    // Handle file uploads if the value is a File object
    if (value instanceof File) {
      try {
        const publicUrl = await handleFileUpload(value);
        value = publicUrl;
      } catch (error) {
        toast.error("Failed to upload file");
        return;
      }
    }

    setContent(prev => {
      const newContent = { ...prev };
      if (index !== undefined && field && Array.isArray(newContent[section])) {
        (newContent[section] as any[])[index] = {
          ...(newContent[section] as any[])[index],
          [field]: value
        };
      } else if (typeof value === "object" && !(value instanceof File)) {
        newContent[section] = { ...newContent[section], ...value };
      } else {
        newContent[section] = value;
      }
      return newContent;
    });
  };

  const handleSave = async () => {
    if (!user) {
      toast.error("You must be logged in to save pages");
      return;
    }

    try {
      const pageData = {
        title: pageTitle,
        url: pageUrl,
        content,
        user_id: user.id,
        last_modified: new Date().toISOString()
      };

      if (pageId) {
        const { error } = await supabase
          .from('pages')
          .update(pageData)
          .eq('id', pageId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('pages')
          .insert({ ...pageData, status: 'draft' });

        if (error) throw error;
      }

      setLastSaved(new Date());
      setIsDirty(false);
      toast.success("Changes saved successfully!");
    } catch (error: any) {
      console.error('Save error:', error);
      toast.error("Failed to save changes. Please try again.");
    }
  };

  const handlePublish = async () => {
    if (!user) {
      toast.error("You must be logged in to publish pages");
      return;
    }

    setIsPublishing(true);
    try {
      if (isDirty) {
        await handleSave();
      }

      const pageData = {
        status: 'published',
        published_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('pages')
        .update(pageData)
        .eq('id', pageId);

      if (error) throw error;

      toast.success("Page published successfully!");
      navigate("/admin/pages");
    } catch (error: any) {
      console.error('Publish error:', error);
      toast.error("Failed to publish page. Please try again.");
    } finally {
      setIsPublishing(false);
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
    handleSave,
    handlePublish,
    isPublishing
  };
}
