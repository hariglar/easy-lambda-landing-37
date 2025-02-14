import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Eye, Save, Share2, Globe, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface EditorHeaderProps {
  lastSaved: Date | null;
  onSave: () => Promise<void>;
  isDirty: boolean;
  pageUrl: string;
  pageTitle: string;
}

export function EditorHeader({ lastSaved, onSave, isDirty, pageUrl, pageTitle }: EditorHeaderProps) {
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

  const handlePreview = async () => {
    try {
      await onSave();
      const normalizedUrl = pageUrl.startsWith('/') ? pageUrl : `/${pageUrl}`;
      const previewUrl = `/preview${normalizedUrl}`;
      setTimeout(() => {
        window.open(previewUrl, '_blank');
      }, 100);
    } catch (error) {
      toast.error("Please save the page before previewing");
    }
  };

  const handlePublishClick = () => {
    const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
    const currentPage = storedPages.find((p: any) => p.url === pageUrl);
    
    if (currentPage?.status === 'published') {
      setOriginalPublishedUrl(currentPage.url);
    } else {
      setOriginalPublishedUrl(null);
    }
    
    setPublishDialogOpen(true);
  };

  const handleRevertUrl = () => {
    if (originalPublishedUrl) {
      const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
      const currentPage = storedPages.find((p: any) => p.url === pageUrl);
      if (currentPage) {
        currentPage.url = originalPublishedUrl;
        localStorage.setItem('pages', JSON.stringify(storedPages));
        toast.success("URL reverted to original");
        setPublishDialogOpen(false);
        navigate(`/admin/pages/edit?pageId=${currentPage.id}`);
      }
    }
  };

  const handlePublish = async () => {
    await onSave();

    setIsPublishing(true);
    try {
      const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
      const currentPage = storedPages.find((p: any) => p.url === pageUrl);
      
      if (!currentPage) {
        throw new Error("Page not found");
      }

      currentPage.url = formattedUrl;
      currentPage.status = "published";
      currentPage.publishedAt = new Date().toISOString();
      
      localStorage.setItem('pages', JSON.stringify(storedPages));
      
      toast.success("Page published successfully!");
      setPublishDialogOpen(false);
      
      navigate("/admin/pages");
    } catch (error) {
      toast.error("Failed to publish page. Please try again.");
    } finally {
      setIsPublishing(false);
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
        <div className="flex items-center gap-4">
          {lastSaved && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              Last saved {lastSaved.toLocaleTimeString()}
            </div>
          )}
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={onSave} disabled={!isDirty}>
            <Save className="w-4 h-4 mr-2" />
            {isDirty ? "Save Draft" : "Saved"}
          </Button>
          <Button onClick={handlePublishClick} variant="default">
            <Globe className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      <Dialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish Page</DialogTitle>
            <DialogDescription>
              {originalPublishedUrl 
                ? "Update your published page with the following changes:"
                : "Are you sure you want to publish this page? It will be accessible at the following URL:"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {hasUrlChanged && (
              <Alert variant="warning" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Warning: You're about to change the URL of a published page. This may break existing links to your page.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="flex flex-col space-y-2">
              {originalPublishedUrl && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Current Published URL:</span>
                  <span className="font-medium">{originalPublishedUrl}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {originalPublishedUrl ? 'New URL:' : 'Published URL:'}
                </span>
                <span className={`font-medium ${hasUrlChanged ? 'text-yellow-600' : 'text-green-600'}`}>
                  {formattedUrl}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter className="space-x-2">
            <Button variant="outline" onClick={() => setPublishDialogOpen(false)}>
              Cancel
            </Button>
            {hasUrlChanged && (
              <Button
                variant="secondary"
                onClick={handleRevertUrl}
                className="mr-2"
              >
                Revert URL Changes
              </Button>
            )}
            <Button onClick={handlePublish} disabled={isPublishing}>
              <Globe className="w-4 h-4 mr-2" />
              {isPublishing ? "Publishing..." : originalPublishedUrl ? "Update Page" : "Publish Page"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
