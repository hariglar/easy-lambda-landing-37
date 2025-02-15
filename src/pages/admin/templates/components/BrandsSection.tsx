
import { TemplateContent } from "../../types/editor";
import { ImageEditor } from "../../components/editor/ImageEditor";

interface BrandsSectionProps {
  brands: TemplateContent['brands'];
  onContentChange: (section: keyof TemplateContent, value: any, index: number, field: string) => void;
  isEditing: boolean;
}

export function BrandsSection({ brands, onContentChange, isEditing }: BrandsSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {brands.map((brand, index) => (
            <div 
              key={index}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <ImageEditor
                src={brand.logo}
                alt={brand.name}
                className="max-h-20 w-auto object-contain"
                onImageChange={(newSrc) => onContentChange('brands', newSrc, index, 'logo')}
                isEditing={isEditing}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
