
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Eye, Save, Share2, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

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

  const handlePreview = async () => {
    try {
      // Always save before preview when creating a new page
      await onSave();
      
      // Ensure the pageUrl starts with a slash
      const normalizedUrl = pageUrl.startsWith('/') ? pageUrl : `/${pageUrl}`;
      const previewUrl = `/preview${normalizedUrl}`;
      
      // Add a small delay to ensure the save completes
      setTimeout(() => {
        window.open(previewUrl, '_blank');
      }, 100);
      
    } catch (error) {
      toast.error("Please save the page before previewing");
    }
  };

  const handlePublish = async () => {
    // First, save any pending changes
    await onSave();

    setIsPublishing(true);
    try {
      // Get existing pages from localStorage
      const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
      
      // Find the page we're currently editing
      const currentPage = storedPages.find((p: any) => p.url === pageUrl);
      
      if (!currentPage) {
        throw new Error("Page not found");
      }

      // Format the URL with hyphens between words
      const formattedUrl = pageUrl
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-') // Replace non-alphanumeric characters with hyphens
        .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
        .replace(/-+/g, '-'); // Replace multiple consecutive hyphens with a single hyphen

      // Update the page URL and status
      currentPage.url = formattedUrl.startsWith('/') ? formattedUrl : `/${formattedUrl}`;
      currentPage.status = "published";
      currentPage.publishedAt = new Date().toISOString();
      
      // Save back to localStorage
      localStorage.setItem('pages', JSON.stringify(storedPages));
      
      toast.success("Page published successfully!");
      setPublishDialogOpen(false);
      
      // After successful publish, navigate back to pages list
      navigate("/admin/pages");
    } catch (error) {
      toast.error("Failed to publish page. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

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
          <Button onClick={() => setPublishDialogOpen(true)} variant="default">
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
              Are you sure you want to publish this page? It will be accessible at the following URL:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">yoursite.com</span>
              <span className="font-medium">{pageUrl}</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPublishDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePublish} disabled={isPublishing}>
              <Globe className="w-4 h-4 mr-2" />
              {isPublishing ? "Publishing..." : "Publish Page"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
