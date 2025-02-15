
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, Heart } from "lucide-react";
import { TemplateContent } from "../../types/editor";
import { EditableText } from "../../components/editor/EditableText";

interface ProductCardProps {
  product: TemplateContent['products'][0];
  index: number;
  onContentChange: (section: keyof TemplateContent, value: any, index: number, field: string) => void;
  isEditing: boolean;
}

export function ProductCard({ product, index, onContentChange, isEditing }: ProductCardProps) {
  return (
    <div 
      className="group relative bg-white rounded-lg shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700"
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4">
        <EditableText
          value={product.name}
          onChange={(value) => onContentChange('products', value, index, 'name')}
          className="text-lg font-semibold mb-2 block"
          identifier={`product.${index}.name`}
          isEditing={isEditing}
        />
        <div className="flex items-center justify-between mb-4">
          <EditableText
            value={product.price}
            onChange={(value) => onContentChange('products', value, index, 'price')}
            className="text-primary font-bold"
            identifier={`product.${index}.price`}
            isEditing={isEditing}
          />
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-muted-foreground">{product.rating}</span>
          </div>
        </div>
        <Button className="w-full">
          <ShoppingBag className="mr-2 h-4 w-4" />
          <EditableText
            value="Add to Cart"
            onChange={(value) => onContentChange('products', value, index, 'buttonText')}
            className="inline-flex items-center"
            identifier={`product.${index}.buttonText`}
            isEditing={isEditing}
          />
        </Button>
      </div>
    </div>
  );
}
