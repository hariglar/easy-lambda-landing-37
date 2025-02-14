
import { Button } from "@/components/ui/button";
import { Clock, Eye, Save, Globe, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface EditorHeaderActionsProps {
  lastSaved: Date | null;
  onSave: () => Promise<void>;
  isDirty: boolean;
  pageUrl: string;
  onPublish: () => void;
}

export function EditorHeaderActions({ lastSaved, onSave, isDirty, pageUrl, onPublish }: EditorHeaderActionsProps) {
  const navigate = useNavigate();
  
  const handlePreview = async () => {
    try {
      // Save the page first
      await onSave();
      
      // Clean and normalize the URL
      const cleanUrl = pageUrl.trim();
      const normalizedUrl = cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`;
      const previewUrl = `/preview${normalizedUrl}`;
      
      // Use navigate instead of window.open to stay within the app
      navigate(previewUrl);
    } catch (error) {
      toast.error("Please save the page before previewing");
    }
  };

  const handleDuplicate = async () => {
    try {
      await onSave();
      
      const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
      const currentPageId = new URLSearchParams(window.location.search).get('pageId');
      const currentPage = storedPages.find((p: any) => p.id === Number(currentPageId));
      
      if (!currentPage) {
        throw new Error("Current page not found");
      }

      const newPageId = Math.max(...storedPages.map((p: any) => p.id), 0) + 1;
      
      const duplicatePage = {
        ...currentPage,
        id: newPageId,
        title: `${currentPage.title} (Copy)`,
        url: `${currentPage.url}-copy`,
        status: "draft",
        views: 0,
        lastModified: new Date().toISOString().split('T')[0]
      };

      storedPages.push(duplicatePage);
      localStorage.setItem('pages', JSON.stringify(storedPages));
      
      toast.success("Page duplicated successfully!");
      navigate("/admin/pages");
    } catch (error) {
      toast.error("Failed to duplicate page. Please try again.");
    }
  };

  return (
    <div className="flex items-center gap-4">
      {lastSaved && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          Last saved {lastSaved.toLocaleTimeString()}
        </div>
      )}
      <Button variant="outline" onClick={handleDuplicate}>
        <Copy className="w-4 h-4 mr-2" />
        Duplicate
      </Button>
      <Button variant="outline" onClick={handlePreview}>
        <Eye className="w-4 h-4 mr-2" />
        Preview
      </Button>
      <Button onClick={onSave} disabled={!isDirty}>
        <Save className="w-4 h-4 mr-2" />
        {isDirty ? "Save Draft" : "Saved"}
      </Button>
      <Button onClick={onPublish} variant="default">
        <Globe className="w-4 h-4 mr-2" />
        Publish
      </Button>
    </div>
  );
}
