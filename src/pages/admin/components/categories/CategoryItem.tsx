
import { FolderIcon, ChevronDown, ChevronRight, Pencil, Trash2, Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category, PageWithCategory } from "../../types/categories";
import { cn } from "@/lib/utils";

interface CategoryItemProps {
  category: Category;
  level: number;
  hasChildren: boolean;
  isExpanded: boolean;
  isSelected: boolean;
  linkedPages: PageWithCategory[];
  onToggleExpand: (categoryId: number) => void;
  onCategorySelect: (category: Category) => void;
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: number) => void;
  onAddSubcategory: (parentId: number) => void;
  children?: React.ReactNode;
}

export function CategoryItem({
  category,
  level,
  hasChildren,
  isExpanded,
  isSelected,
  linkedPages,
  onToggleExpand,
  onCategorySelect,
  onEditCategory,
  onDeleteCategory,
  onAddSubcategory,
  children,
}: CategoryItemProps) {
  return (
    <div className="space-y-2">
      <div 
        className={cn(
          "flex items-center gap-2 p-2 rounded-lg hover:bg-accent group transition-colors",
          level > 0 && "ml-6",
          isSelected && "bg-accent"
        )}
        onClick={() => onCategorySelect(category)}
      >
        <button
          className={cn(
            "w-6 h-6 flex items-center justify-center rounded hover:bg-accent-foreground/10",
            !hasChildren && "invisible"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onToggleExpand(category.id);
          }}
        >
          {hasChildren && (isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />)}
        </button>
        <FolderIcon className="w-5 h-5 text-muted-foreground" />
        <span className="flex-1 text-sm font-medium">{category.name}</span>
        
        <LinkedPagesPreview pages={linkedPages} />

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              onEditCategory(category);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteCategory(category.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => e.stopPropagation()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onAddSubcategory(category.id)}>
                Add Subcategory
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {hasChildren && isExpanded && (
        <div className="ml-6 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}

function LinkedPagesPreview({ pages }: { pages: PageWithCategory[] }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Badge 
          variant="secondary" 
          className="mr-2 cursor-help"
        >
          {pages.length} pages
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Linked Pages</h4>
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            {pages.length > 0 ? (
              <div className="space-y-2">
                {pages.map(page => (
                  <div key={page.id} className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{page.title}</span>
                    <Badge 
                      variant={page.status === "published" ? "default" : "secondary"}
                      className="ml-auto text-xs"
                    >
                      {page.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No pages in this category</p>
            )}
          </ScrollArea>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
