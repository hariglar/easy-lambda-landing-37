
import { TemplateContent } from "../../types/editor";
import { EditableText } from "../../components/editor/EditableText";
import { ImageEditor } from "../../components/editor/ImageEditor";

interface CategoriesSectionProps {
  categories: TemplateContent['categories'];
  onContentChange: (section: keyof TemplateContent, value: any, index: number, field: string) => void;
  isEditing: boolean;
}

export function CategoriesSection({ categories, onContentChange, isEditing }: CategoriesSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-lg aspect-square"
            >
              <ImageEditor
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onImageChange={(newSrc) => onContentChange('categories', newSrc, index, 'image')}
                isEditing={isEditing}
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                <EditableText
                  value={category.name}
                  onChange={(value) => onContentChange('categories', value, index, 'name')}
                  className="text-2xl font-bold mb-2"
                  identifier={`category.${index}.name`}
                  isEditing={isEditing}
                />
                <EditableText
                  value={category.itemCount.toString()}
                  onChange={(value) => onContentChange('categories', parseInt(value), index, 'itemCount')}
                  className="text-white/80"
                  identifier={`category.${index}.itemCount`}
                  isEditing={isEditing}
                />
                <span className="text-white/80">items</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
