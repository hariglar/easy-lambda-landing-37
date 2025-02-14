
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";
import EcommerceLanding from "../templates/EcommerceLanding";
import { TemplateContent } from "../types/editor";

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
  const [content, setContent] = useState<TemplateContent | null>(null);

  useEffect(() => {
    if (isOpen) {
      const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
      const currentPage = storedPages.find((p: any) => p.id === page.id);
      if (currentPage?.content) {
        setContent(currentPage.content);
      }
    }
  }, [isOpen, page.id]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] h-[90vh] scale-in">
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
        
        <div className="space-y-6 h-full">
          <div className="aspect-[16/9] rounded-lg border bg-background overflow-auto">
            {content ? (
              <div className="transform scale-[0.7] origin-top">
                <EcommerceLanding content={content} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                Loading preview...
              </div>
            )}
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
