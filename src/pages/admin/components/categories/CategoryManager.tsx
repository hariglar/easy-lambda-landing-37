
import { useState } from "react";
import { Plus, Pencil, Trash2, FolderIcon, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "../../types/categories";
import { cn } from "@/lib/utils";

interface CategoryManagerProps {
  categories: Category[];
  onCategoryAdd: (category: Omit<Category, "id">) => void;
  onCategoryUpdate: (category: Category) => void;
  onCategoryDelete: (id: number) => void;
}

export function CategoryManager({
  categories,
  onCategoryAdd,
  onCategoryUpdate,
  onCategoryDelete,
}: CategoryManagerProps) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const toggleExpand = (categoryId: number) => {
    setExpanded(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleAddCategory = (parentId?: number) => {
    const newCategory = {
      name: "New Category",
      slug: "new-category",
      parentId: parentId || null
    };
    onCategoryAdd(newCategory);
  };

  const renderCategoryItem = (category: Category, level = 0) => {
    const hasChildren = categories.some(c => c.parentId === category.id);
    const isExpanded = expanded[category.id];

    return (
      <div key={category.id} className="space-y-2">
        <div 
          className={cn(
            "flex items-center gap-2 p-2 rounded-lg hover:bg-accent group",
            level > 0 && "ml-6"
          )}
        >
          <button
            className={cn(
              "w-6 h-6 flex items-center justify-center rounded hover:bg-accent-foreground/10",
              !hasChildren && "invisible"
            )}
            onClick={() => toggleExpand(category.id)}
          >
            {hasChildren && (isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />)}
          </button>
          <FolderIcon className="w-5 h-5 text-muted-foreground" />
          <span className="flex-1 text-sm font-medium">{category.name}</span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setEditingCategory(category)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive"
              onClick={() => onCategoryDelete(category.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleAddCategory(category.id)}>
                  Add Subcategory
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div className="ml-6 space-y-2">
            {categories
              .filter(c => c.parentId === category.id)
              .map(child => renderCategoryItem(child, level + 1))
            }
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Categories</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                onCategoryAdd({
                  name: formData.get("name") as string,
                  slug: formData.get("name") as string,
                  description: formData.get("description") as string,
                });
                (e.target as HTMLFormElement).reset();
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Input name="name" placeholder="Category name" required />
                <Input name="description" placeholder="Category description (optional)" />
              </div>
              <Button type="submit">Add Category</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <div className="p-4 space-y-2">
          {categories
            .filter(category => !category.parentId)
            .map(category => renderCategoryItem(category))}
        </div>
      </div>

      <Dialog open={!!editingCategory} onOpenChange={(open) => !open && setEditingCategory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          {editingCategory && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                onCategoryUpdate({
                  ...editingCategory,
                  name: formData.get("name") as string,
                  description: formData.get("description") as string,
                });
                setEditingCategory(null);
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Input 
                  name="name" 
                  defaultValue={editingCategory.name}
                  placeholder="Category name" 
                  required 
                />
                <Input 
                  name="description" 
                  defaultValue={editingCategory.description}
                  placeholder="Category description (optional)" 
                />
              </div>
              <Button type="submit">Update Category</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
