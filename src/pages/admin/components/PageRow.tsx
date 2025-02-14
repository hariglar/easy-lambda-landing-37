
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { Eye, FileEdit, Globe, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PagePreviewDialog } from "./PagePreviewDialog";
import { TemplateContent, defaultContent } from "../types/editor";

interface PageRowProps {
  page: {
    id: number;
    title: string;
    status: string;
    url: string;
    lastModified: string;
    views: number;
    content?: TemplateContent;
  };
  onDeleteClick: (id: number) => void;
}

export function PageRow({ page, onDeleteClick }: PageRowProps) {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);

  // Ensure we always have content, fallback to defaultContent if none exists
  const pageWithContent = {
    ...page,
    content: page.content || defaultContent
  };

  return (
    <>
      <TableRow className="group">
        <TableCell className="font-medium">{page.title}</TableCell>
        <TableCell>{page.url}</TableCell>
        <TableCell>
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            page.status === 'published' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-yellow-100 text-yellow-700'
          }`}>
            {page.status === 'published' ? <Globe className="w-3 h-3" /> : null}
            {page.status}
          </span>
        </TableCell>
        <TableCell>{page.lastModified}</TableCell>
        <TableCell>{page.views.toLocaleString()}</TableCell>
        <TableCell className="text-right">
          <div className="flex items-center justify-end gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowPreview(true)}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(`/admin/pages/new?pageId=${page.id}&template=ecommerce`)}
            >
              <FileEdit className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-destructive"
              onClick={() => onDeleteClick(page.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>

      <PagePreviewDialog
        open={showPreview}
        onOpenChange={setShowPreview}
        page={pageWithContent}
      />
    </>
  );
}
