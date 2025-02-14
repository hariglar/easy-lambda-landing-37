
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Eye, Save, Share2, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  onSave: () => void;
  isDirty: boolean;
}

export function EditorHeader({ lastSaved, onSave, isDirty }: EditorHeaderProps) {
  const navigate = useNavigate();
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [pageUrl, setPageUrl] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    if (!pageUrl) {
      toast.error("Please enter a URL for your page");
      return;
    }

    setIsPublishing(true);
    try {
      // Here you would typically make an API call to publish the page
      // For now, we'll simulate a publish action
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const publicUrl = `https://yoursite.com/${pageUrl.startsWith('/') ? pageUrl.slice(1) : pageUrl}`;
      toast.success("Page published successfully!", {
        description: (
          <div className="mt-2">
            <p>Your page is now live at:</p>
            <a 
              href={publicUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {publicUrl}
            </a>
          </div>
        ),
        duration: 5000,
      });
      setPublishDialogOpen(false);
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
            <h1 className="text-4xl font-bold tracking-tight">Create New Page</h1>
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
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={onSave} disabled={!isDirty}>
            <Save className="w-4 h-4 mr-2" />
            {isDirty ? "Save Changes" : "Saved"}
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
              Choose a URL for your page. This will be the public address where your page can be accessed.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="pageUrl">Page URL</Label>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">yoursite.com/</span>
                <Input
                  id="pageUrl"
                  placeholder="my-awesome-page"
                  value={pageUrl}
                  onChange={(e) => setPageUrl(e.target.value)}
                />
              </div>
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
