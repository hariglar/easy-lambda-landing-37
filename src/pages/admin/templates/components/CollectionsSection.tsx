
import { TemplateContent } from "../../types/editor";
import { EditableText } from "../../components/editor/EditableText";
import { ImageEditor } from "../../components/editor/ImageEditor";

interface CollectionsSectionProps {
  collections: TemplateContent['collections'];
  onContentChange: (section: keyof TemplateContent, value: any, index: number, field: string) => void;
  isEditing: boolean;
}

export function CollectionsSection({ collections, onContentChange, isEditing }: CollectionsSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-lg aspect-[2/1]"
            >
              <ImageEditor
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onImageChange={(newSrc) => onContentChange('collections', newSrc, index, 'image')}
                isEditing={isEditing}
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
                <EditableText
                  value={collection.title}
                  onChange={(value) => onContentChange('collections', value, index, 'title')}
                  className="text-2xl font-bold mb-2"
                  identifier={`collection.${index}.title`}
                  isEditing={isEditing}
                />
                <EditableText
                  value={collection.description}
                  onChange={(value) => onContentChange('collections', value, index, 'description')}
                  className="text-white/80 mb-4"
                  identifier={`collection.${index}.description`}
                  isEditing={isEditing}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
