
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Globe } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import EcommerceLanding from "../templates/EcommerceLanding";
import { TemplateContent } from "../types/editor";

interface PagePreviewDialogProps {
  page: {
    id: number;
    title: string;
    status: string;
    url: string;
    lastModified: string;
    views: number;
    content: TemplateContent;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PagePreviewDialog({
  page,
  open,
  onOpenChange,
}: PagePreviewDialogProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen-xl h-[90vh]">
        <DialogHeader>
          <DialogTitle>Page Preview</DialogTitle>
          <DialogDescription>
            This is how your page will look when published
          </DialogDescription>
        </DialogHeader>
        <div ref={ref} className="relative flex-1 overflow-y-auto">
          <EcommerceLanding 
            content={page.content} 
            onContentChange={() => {}} 
            isEditing={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
