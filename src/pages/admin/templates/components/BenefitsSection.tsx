
import { Award, Headphones, Truck } from "lucide-react";
import { TemplateContent } from "../../types/editor";
import { EditableText } from "../../components/editor/EditableText";

interface BenefitsSectionProps {
  benefits?: TemplateContent['benefits'];
  onContentChange: (section: keyof TemplateContent, value: any, index: number, field: string) => void;
  isEditing: boolean;
}

const iconMap = {
  award: Award,
  headphones: Headphones,
  truck: Truck
};

export function BenefitsSection({ benefits = defaultBenefits, onContentChange, isEditing }: BenefitsSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon as keyof typeof iconMap];
            return (
              <div 
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700 hover:shadow-md transition-shadow"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <Icon className="h-12 w-12 text-primary mb-4" />
                <EditableText
                  value={benefit.title}
                  onChange={(value) => onContentChange('benefits', value, index, 'title')}
                  className="text-lg font-semibold mb-2"
                  identifier={`benefit.${index}.title`}
                  isEditing={isEditing}
                />
                <EditableText
                  value={benefit.description}
                  onChange={(value) => onContentChange('benefits', value, index, 'description')}
                  className="text-muted-foreground"
                  identifier={`benefit.${index}.description`}
                  isEditing={isEditing}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const defaultBenefits: TemplateContent['benefits'] = [
  { title: "Premium Quality", description: "Handcrafted with the finest materials", icon: "award" },
  { title: "Expert Support", description: "24/7 dedicated customer service", icon: "headphones" },
  { title: "Worldwide Shipping", description: "Fast delivery to your doorstep", icon: "truck" }
];
