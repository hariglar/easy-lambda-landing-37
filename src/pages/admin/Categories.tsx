
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Category, PageWithCategory } from "./types/categories";
import { CategoryManager } from "./components/categories/CategoryManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FolderHeart, ListTree } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export default function Categories() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [pages, setPages] = useState<PageWithCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    const storedCategories = localStorage.getItem('categories');
    const storedPages = localStorage.getItem('pages');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
    if (storedPages) {
      setPages(JSON.parse(storedPages));
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
    // Update pages to remove the deleted category
    const updatedPages = pages.map(page => 
      page.categoryId === categoryId 
        ? { ...page, categoryId: null }
        : page
    );
    localStorage.setItem('pages', JSON.stringify(updatedPages));
    setPages(updatedPages);

    const updatedCategories = categories.filter(c => c.id !== categoryId);
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    
    toast({
      title: "Category deleted",
      description: "The category has been deleted successfully."
    });
  };

  const getCategoryPages = (categoryId: number) => {
    return pages.filter(page => page.categoryId === categoryId);
  };

  const getCategoryStats = () => {
    const stats = categories.map(category => ({
      ...category,
      pageCount: pages.filter(page => page.categoryId === category.id).length,
      publishedCount: pages.filter(page => 
        page.categoryId === category.id && page.status === "published"
      ).length,
      draftCount: pages.filter(page => 
        page.categoryId === category.id && page.status === "draft"
      ).length
    }));
    return stats;
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

      <Tabs defaultValue="tree" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tree">
            <ListTree className="w-4 h-4 mr-2" />
            Tree View
          </TabsTrigger>
          <TabsTrigger value="stats">
            <FolderHeart className="w-4 h-4 mr-2" />
            Category Stats
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tree" className="space-y-4">
          <CategoryManager
            categories={categories}
            onCategoryAdd={handleAddCategory}
            onCategoryUpdate={handleUpdateCategory}
            onCategoryDelete={handleDeleteCategory}
            onCategorySelect={setSelectedCategory}
            selectedCategory={selectedCategory}
            getLinkedPages={getCategoryPages}
          />
        </TabsContent>

        <TabsContent value="stats">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {getCategoryStats().map(category => (
              <Card key={category.id} className="hover:bg-accent/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {category.name}
                  </CardTitle>
                  <FileText className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{category.pageCount}</div>
                  <p className="text-xs text-muted-foreground">
                    Total Pages
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {category.publishedCount} Published
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {category.draftCount} Drafts
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
