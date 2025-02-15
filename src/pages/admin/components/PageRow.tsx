
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { Eye, FileEdit, Globe, Trash2, FolderIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PagePreviewDialog } from "./PagePreviewDialog";
import { TemplateContent } from "../types/editor";
import { Category } from "../types/categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PageRowProps {
  page: {
    id: number;
    title: string;
    status: string;
    url: string;
    lastModified: string;
    views: number;
    content: TemplateContent;
    categoryId?: number | null;
  };
  onDeleteClick: (id: number) => void;
  categories?: Category[];
  onCategoryChange?: (pageId: number, categoryId: number | null) => void;
}

export function PageRow({ page, onDeleteClick, categories = [], onCategoryChange }: PageRowProps) {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);

  const category = categories.find(c => c.id === page.categoryId);

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
        <TableCell>
          <div className="flex items-center gap-2">
            <Select
              value={page.categoryId?.toString() || "none"}
              onValueChange={(value) => onCategoryChange?.(page.id, value === "none" ? null : parseInt(value))}
            >
              <SelectTrigger className="h-8">
                <SelectValue placeholder={
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <FolderIcon className="w-4 h-4" />
                    <span>Select category</span>
                  </span>
                } />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No category</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
              onClick={() => navigate(`/admin/pages/edit/${page.id}`)}
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
        page={page}
      />
    </>
  );
}
