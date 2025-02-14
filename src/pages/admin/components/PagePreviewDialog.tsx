
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PagePreviewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  page: {
    id: number;
    title: string;
    status: string;
    url: string;
    lastModified: string;
    views: number;
  };
}

export function PagePreviewDialog({ isOpen, onOpenChange, page }: PagePreviewDialogProps) {
  const navigate = useNavigate();

  const handleViewFullPage = () => {
    onOpenChange(false); // Close the dialog
    navigate(`/admin/pages/${page.id}/edit`); // Navigate to the full page editor
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl scale-in">
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
          <div className="aspect-[16/9] rounded-lg border bg-muted/50 flex items-center justify-center animate-in fade-in">
            Page preview coming soon...
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm animate-in fade-in duration-300">
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
            <Button onClick={handleViewFullPage}>
              View Full Page
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
