
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { EditorHeaderActions } from "./EditorHeaderActions";
import { PublishDialog } from "./PublishDialog";
import { toast } from "sonner";

interface EditorHeaderProps {
  lastSaved: Date | null;
  onSave: () => Promise<void>;
  isDirty: boolean;
  pageUrl: string;
  pageTitle: string;
  setPageUrl: (url: string) => void;
}

export function EditorHeader({
  lastSaved,
  onSave,
  isDirty,
  pageUrl,
  pageTitle,
  setPageUrl
}: EditorHeaderProps) {
  const navigate = useNavigate();
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [originalPublishedUrl, setOriginalPublishedUrl] = useState<string | null>(null);

  const formattedUrl = useMemo(() => {
    const formatted = pageUrl
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-+/g, '-');

    return formatted.startsWith('/') ? formatted : `/${formatted}`;
  }, [pageUrl]);

  const handlePublishClick = () => {
    const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
    const currentPageId = new URLSearchParams(window.location.search).get('pageId');
    const currentPage = storedPages.find((p: any) => p.id === Number(currentPageId));
    
    if (currentPage?.status === 'published') {
      setOriginalPublishedUrl(currentPage.url);
    } else {
      setOriginalPublishedUrl(null);
    }
    
    setPublishDialogOpen(true);
  };

  const handlePublish = async () => {
    if (isDirty) {
      try {
        await onSave();
      } catch (error) {
        toast.error("Failed to save changes before publishing. Please try again.");
        return;
      }
    }

    setIsPublishing(true);
    try {
      const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
      const currentPageId = new URLSearchParams(window.location.search).get('pageId');
      
      if (!currentPageId) {
        throw new Error("No page ID found");
      }

      const currentPage = storedPages.find((p: any) => p.id === Number(currentPageId));
      
      if (!currentPage) {
        throw new Error("Page not found");
      }

      // Check URL uniqueness before publishing
      const otherPages = storedPages.filter((p: any) => p.id !== Number(currentPageId));
      const isUrlTaken = otherPages.some((p: any) => p.url === formattedUrl);
      
      if (isUrlTaken) {
        toast.error("This URL is already in use by another page. Please choose a different URL.");
        return;
      }

      currentPage.url = formattedUrl;
      currentPage.status = "published";
      currentPage.publishedAt = new Date().toISOString();
      
      localStorage.setItem('pages', JSON.stringify(storedPages));
      
      toast.success("Page published successfully!");
      setPublishDialogOpen(false);
      
      setTimeout(() => {
        navigate("/admin/pages");
      }, 1500);
    } catch (error) {
      console.error('Publishing error:', error);
      toast.error("Failed to publish page. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleRevertUrl = () => {
    if (originalPublishedUrl) {
      const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
      const currentPageId = new URLSearchParams(window.location.search).get('pageId');
      const currentPage = storedPages.find((p: any) => p.id === Number(currentPageId));
      
      if (currentPage) {
        currentPage.url = originalPublishedUrl;
        localStorage.setItem('pages', JSON.stringify(storedPages));
        setPageUrl(originalPublishedUrl);
        setPublishDialogOpen(false);
      }
    }
  };

  const hasUrlChanged = originalPublishedUrl && originalPublishedUrl !== formattedUrl;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/pages")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{pageTitle || "Create New Page"}</h1>
            <p className="text-muted-foreground mt-2">
              Design and publish your landing page.
            </p>
          </div>
        </div>
        <EditorHeaderActions
          lastSaved={lastSaved}
          onSave={onSave}
          isDirty={isDirty}
          pageUrl={pageUrl}
          onPublish={handlePublishClick}
        />
      </div>

      <PublishDialog
        open={publishDialogOpen}
        onOpenChange={setPublishDialogOpen}
        originalPublishedUrl={originalPublishedUrl}
        formattedUrl={formattedUrl}
        hasUrlChanged={hasUrlChanged}
        onRevertUrl={handleRevertUrl}
        onPublish={handlePublish}
        isPublishing={isPublishing}
      />
    </>
  );
}
