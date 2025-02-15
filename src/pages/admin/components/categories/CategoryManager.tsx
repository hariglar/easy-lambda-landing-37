
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Category, PageWithCategory } from "../../types/categories";
import { CategoryItem } from "./CategoryItem";
import { CategoryForm } from "./CategoryForm";

interface CategoryManagerProps {
  categories: Category[];
  onCategoryAdd: (category: Omit<Category, "id">) => void;
  onCategoryUpdate: (category: Category) => void;
  onCategoryDelete: (id: number) => void;
  onCategorySelect: (category: Category | null) => void;
  selectedCategory: Category | null;
  getLinkedPages: (categoryId: number) => PageWithCategory[];
}

export function CategoryManager({
  categories,
  onCategoryAdd,
  onCategoryUpdate,
  onCategoryDelete,
  onCategorySelect,
  selectedCategory,
  getLinkedPages,
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

  const renderCategoryTree = (category: Category, level = 0) => {
    const hasChildren = categories.some(c => c.parentId === category.id);
    const isExpanded = expanded[category.id];
    const linkedPages = getLinkedPages(category.id);
    const isSelected = selectedCategory?.id === category.id;
    const childCategories = categories.filter(c => c.parentId === category.id);

    return (
      <CategoryItem
        key={category.id}
        category={category}
        level={level}
        hasChildren={hasChildren}
        isExpanded={isExpanded}
        isSelected={isSelected}
        linkedPages={linkedPages}
        onToggleExpand={toggleExpand}
        onCategorySelect={onCategorySelect}
        onEditCategory={setEditingCategory}
        onDeleteCategory={onCategoryDelete}
        onAddSubcategory={handleAddCategory}
      >
        {childCategories.map(child => renderCategoryTree(child, level + 1))}
      </CategoryItem>
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
            <CategoryForm onSubmit={onCategoryAdd} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <div className="p-4 space-y-2">
          {categories
            .filter(category => !category.parentId)
            .map(category => renderCategoryTree(category))}
        </div>
      </div>

      <Dialog open={!!editingCategory} onOpenChange={(open) => !open && setEditingCategory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          {editingCategory && (
            <CategoryForm
              category={editingCategory}
              onSubmit={(data) => {
                onCategoryUpdate({
                  ...editingCategory,
                  ...data,
                });
                setEditingCategory(null);
              }}
              onCancel={() => setEditingCategory(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
