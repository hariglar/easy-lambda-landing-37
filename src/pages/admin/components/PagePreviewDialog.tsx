
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface PagePreviewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  page: {
    title: string;
    status: string;
    url: string;
    lastModified: string;
    views: number;
  };
}

export function PagePreviewDialog({ isOpen, onOpenChange, page }: PagePreviewDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {page.title}
            {page.status === 'published' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                <Globe className="w-3 h-3" />
                Published
              </span>
            )}
          </DialogTitle>
          <DialogDescription>
            Preview of {page.url}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="aspect-[16/9] rounded-lg border bg-muted/50 flex items-center justify-center">
            Page preview coming soon...
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Last Modified</p>
              <p className="font-medium">{page.lastModified}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Views</p>
              <p className="font-medium">{page.views.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button>
              View Full Page
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
