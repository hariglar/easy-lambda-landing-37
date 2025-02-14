
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Globe } from "lucide-react";

interface PublishDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  originalPublishedUrl: string | null;
  formattedUrl: string;
  hasUrlChanged: boolean;
  onRevertUrl: () => void;
  onPublish: () => void;
  isPublishing: boolean;
}

export function PublishDialog({
  open,
  onOpenChange,
  originalPublishedUrl,
  formattedUrl,
  hasUrlChanged,
  onRevertUrl,
  onPublish,
  isPublishing
}: PublishDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {hasUrlChanged && (
            <Button
              variant="secondary"
              onClick={onRevertUrl}
              className="mr-2"
            >
              Revert URL Changes
            </Button>
          )}
          <Button onClick={onPublish} disabled={isPublishing}>
            <Globe className="w-4 h-4 mr-2" />
            {isPublishing ? "Publishing..." : originalPublishedUrl ? "Update Page" : "Publish Page"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
