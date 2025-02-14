
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, Heart } from "lucide-react";
import { RichTextEditor } from "../../components/editor/RichTextEditor";
import { TemplateContent } from "../../types/editor";

interface ProductsSectionProps {
  products: TemplateContent['products'];
  onContentChange: (section: keyof TemplateContent, value: any, index?: number, field?: string) => void;
  isEditing: boolean;
}

export function ProductsSection({ products, onContentChange, isEditing }: ProductsSectionProps) {
  const EditableContent = ({ 
    value, 
    onChange,
    className = "",
    identifier
  }: { 
    value: string;
    onChange: (value: string) => void;
    className?: string;
    identifier: string;
  }) => {
    if (!isEditing) {
      return <div className={className} dangerouslySetInnerHTML={{ __html: value }} />;
    }

    return (
      <RichTextEditor
        content={value}
        onChange={onChange}
        className={className}
      />
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <EditableContent
          value={products.sectionTitle}
          onChange={(value) => onContentChange('products', { ...products, sectionTitle: value })}
          className="text-3xl font-bold text-center mb-12"
          identifier="products.sectionTitle"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={index}
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
                <EditableContent
                  value={product.name}
                  onChange={(value) => onContentChange('products', value, index, 'name')}
                  className="text-lg font-semibold mb-2 block"
                  identifier={`product.${index}.name`}
                />
                <div className="flex items-center justify-between mb-4">
                  <EditableContent
                    value={product.price}
                    onChange={(value) => onContentChange('products', value, index, 'price')}
                    className="text-primary font-bold"
                    identifier={`product.${index}.price`}
                  />
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-muted-foreground">
                      {product.rating}
                    </span>
                  </div>
                </div>
                <Button className="w-full">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  <EditableContent
                    value="Add to Cart"
                    onChange={(value) => onContentChange('products', value, index, 'buttonText')}
                    className="inline-flex items-center"
                    identifier={`product.${index}.buttonText`}
                  />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
