
import { Button } from "@/components/ui/button";
import { Clock, Save, Globe, Copy, EyeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PageVersionHistory } from "./PageVersionHistory";
import { SEOPanel } from "./SEOPanel";
import { useState } from "react";

interface EditorHeaderActionsProps {
  lastSaved: Date | null;
  onSave: () => Promise<void>;
  isDirty: boolean;
  pageUrl: string;
  onPublish: () => void;
}

export function EditorHeaderActions({
  lastSaved,
  onSave,
  isDirty,
  pageUrl,
  onPublish
}: EditorHeaderActionsProps) {
  const navigate = useNavigate();
  const [previewMode, setPreviewMode] = useState(false);

  // Mock version history data
  const versions = [
    {
      id: "1",
      timestamp: new Date(Date.now() - 3600000),
      title: "Latest Draft",
      changes: ["Updated hero section", "Modified product listings"]
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 86400000),
      title: "Initial Version",
      changes: ["Created page", "Added basic content"]
    }
  ];

  // Mock SEO data
  const [seoData, setSeoData] = useState({
    title: "Page Title",
    description: "Page description for search engines",
    keywords: "keyword1, keyword2, keyword3",
    openGraph: {
      title: "OG Title",
      description: "OG Description",
      image: "https://example.com/og-image.jpg"
    }
  });

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

  const handleRestoreVersion = (versionId: string) => {
    // Implementation for version restoration
    toast.success("Version restored successfully!");
  };

  return (
    <div className="flex items-center gap-4">
      {lastSaved && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          Last saved {lastSaved.toLocaleTimeString()}
        </div>
      )}
      
      <SEOPanel 
        seoData={seoData}
        onSEOChange={setSeoData}
      />
      
      <PageVersionHistory
        versions={versions}
        onRestoreVersion={handleRestoreVersion}
      />

      <Button 
        variant="outline" 
        size="icon"
        className={previewMode ? "bg-primary text-primary-foreground" : ""}
        onClick={() => setPreviewMode(!previewMode)}
      >
        <EyeIcon className="w-4 h-4" />
      </Button>

      <Button variant="outline" onClick={handleDuplicate}>
        <Copy className="w-4 h-4 mr-2" />
        Duplicate
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
