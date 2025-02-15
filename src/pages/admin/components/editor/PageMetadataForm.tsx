
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Category } from "../../types/categories";

interface PageMetadataFormProps {
  pageTitle: string;
  setPageTitle: (title: string) => void;
  pageUrl: string;
  setPageUrl: (url: string) => void;
  categoryId: number | null;
  setCategoryId: (id: number | null) => void;
  setIsDirty: (dirty: boolean) => void;
}

export function PageMetadataForm({
  pageTitle,
  setPageTitle,
  pageUrl,
  setPageUrl,
  categoryId,
  setCategoryId,
  setIsDirty
}: PageMetadataFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Page Title</Label>
          <Input
            value={pageTitle}
            onChange={(e) => {
              setPageTitle(e.target.value);
              setIsDirty(true);
            }}
            placeholder="Enter page title..."
          />
        </div>
        <div className="space-y-2">
          <Label>Page URL</Label>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">/</span>
            <Input
              value={pageUrl.startsWith('/') ? pageUrl.slice(1) : pageUrl}
              onChange={(e) => {
                setPageUrl('/' + e.target.value.replace(/^\/*/, ''));
                setIsDirty(true);
              }}
              placeholder="page-url"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            The URL should be unique and contain only letters, numbers, and hyphens
          </p>
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select 
            value={categoryId?.toString() || "none"} 
            onValueChange={(value) => {
              setCategoryId(value === "none" ? null : Number(value));
              setIsDirty(true);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
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
      </div>
    </Card>
  );
}
