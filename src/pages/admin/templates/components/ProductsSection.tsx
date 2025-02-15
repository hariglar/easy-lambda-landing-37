
import { TemplateContent } from "../../types/editor";
import { EditableText } from "../../components/editor/EditableText";
import { ProductCard } from "./ProductCard";

interface ProductsSectionProps {
  products: TemplateContent['products'];
  onContentChange: (section: keyof TemplateContent, value: any, index?: number, field?: string) => void;
  isEditing: boolean;
}

export function ProductsSection({ products, onContentChange, isEditing }: ProductsSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <EditableText
          value="Featured Products"
          onChange={(value) => onContentChange('products', { sectionTitle: value })}
          className="text-3xl font-bold text-center mb-12"
          identifier="products.sectionTitle"
          isEditing={isEditing}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              index={index}
              onContentChange={onContentChange}
              isEditing={isEditing}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
