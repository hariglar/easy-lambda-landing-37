
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Category } from "./types/categories";
import { CategoryManager } from "./components/categories/CategoryManager";

export default function Categories() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  const handleAddCategory = (categoryData: Omit<Category, "id">) => {
    const newCategory: Category = {
      ...categoryData,
      id: Math.max(0, ...categories.map(c => c.id)) + 1
    };
    
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    
    toast({
      title: "Category created",
      description: `${newCategory.name} has been created successfully.`
    });
  };

  const handleUpdateCategory = (category: Category) => {
    const updatedCategories = categories.map(c => 
      c.id === category.id ? category : c
    );
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    
    toast({
      title: "Category updated",
      description: `${category.name} has been updated successfully.`
    });
  };

  const handleDeleteCategory = (categoryId: number) => {
    const updatedCategories = categories.filter(c => c.id !== categoryId);
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    
    toast({
      title: "Category deleted",
      description: "The category has been deleted successfully."
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Manage and organize your pages with categories
          </p>
        </div>
      </div>

      <CategoryManager
        categories={categories}
        onCategoryAdd={handleAddCategory}
        onCategoryUpdate={handleUpdateCategory}
        onCategoryDelete={handleDeleteCategory}
      />
    </div>
  );
}
