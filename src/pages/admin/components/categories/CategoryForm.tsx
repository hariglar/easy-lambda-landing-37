
import { Category } from "../../types/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CategoryFormProps {
  category?: Category;
  onSubmit: (data: { name: string; description?: string }) => void;
  onCancel?: () => void;
}

export function CategoryForm({ category, onSubmit, onCancel }: CategoryFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        onSubmit({
          name: formData.get("name") as string,
          description: formData.get("description") as string,
        });
        (e.target as HTMLFormElement).reset();
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Input 
          name="name" 
          defaultValue={category?.name}
          placeholder="Category name" 
          required 
        />
        <Input 
          name="description" 
          defaultValue={category?.description}
          placeholder="Category description (optional)" 
        />
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          {category ? "Update Category" : "Add Category"}
        </Button>
      </div>
    </form>
  );
}
