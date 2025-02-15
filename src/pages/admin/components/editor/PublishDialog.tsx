
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Publish Page</DialogTitle>
          <DialogDescription>
            Make this page live and accessible to visitors.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Page URL</Label>
            <Input value={formattedUrl} readOnly />
          </div>
          
          {hasUrlChanged && (
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                The URL has changed from the previously published version.
                <Button
                  variant="link"
                  className="px-2 font-normal text-amber-600 h-auto"
                  onClick={onRevertUrl}
                >
                  Revert to original URL ({originalPublishedUrl})
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onPublish} disabled={isPublishing}>
            {isPublishing ? "Publishing..." : "Publish"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
