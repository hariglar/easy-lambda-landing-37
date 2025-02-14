
import { Truck, RefreshCw, ShieldCheck } from "lucide-react";
import { RichTextEditor } from "../../components/editor/RichTextEditor";
import { TemplateContent } from "../../types/editor";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface FeaturesSectionProps {
  features: TemplateContent['features'];
  onContentChange: (section: keyof TemplateContent, value: any, index: number, field: string) => void;
  isEditing: boolean;
}

export function FeaturesSection({ features, onContentChange, isEditing }: FeaturesSectionProps) {
  const [editingField, setEditingField] = useState<string | null>(null);

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

    if (isEditing && editingField !== identifier) {
      return (
        <div 
          className={`${className} cursor-pointer hover:ring-2 hover:ring-primary hover:ring-opacity-50 rounded`}
          onClick={() => setEditingField(identifier)}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      );
    }

    return (
      <div className="relative">
        <RichTextEditor
          content={value}
          onChange={(newValue) => {
            onChange(newValue);
            setEditingField(null);
          }}
          className={className}
        />
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2"
          onClick={() => setEditingField(null)}
        >
          Done
        </Button>
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = [Truck, RefreshCw, ShieldCheck][index];
            return (
              <div 
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <Icon className="h-12 w-12 text-primary mb-4" />
                <EditableContent
                  value={feature.title}
                  onChange={(value) => onContentChange('features', value, index, 'title')}
                  className="text-lg font-semibold mb-2"
                  identifier={`feature.${index}.title`}
                />
                <EditableContent
                  value={feature.description}
                  onChange={(value) => onContentChange('features', value, index, 'description')}
                  className="text-muted-foreground"
                  identifier={`feature.${index}.description`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
