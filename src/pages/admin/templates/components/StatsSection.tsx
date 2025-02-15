
import { TemplateContent } from "../../types/editor";
import { EditableText } from "../../components/editor/EditableText";

interface StatsSectionProps {
  stats?: TemplateContent['stats'];
  onContentChange: (section: keyof TemplateContent, value: any, index: number, field: string) => void;
  isEditing: boolean;
}

export function StatsSection({ stats = defaultStats, onContentChange, isEditing }: StatsSectionProps) {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <EditableText
                value={stat.value}
                onChange={(value) => onContentChange('stats', value, index, 'value')}
                className="text-4xl font-bold"
                identifier={`stat.${index}.value`}
                isEditing={isEditing}
              />
              <EditableText
                value={stat.label}
                onChange={(value) => onContentChange('stats', value, index, 'label')}
                className="text-lg text-white/80"
                identifier={`stat.${index}.label`}
                isEditing={isEditing}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const defaultStats: TemplateContent['stats'] = [
  { value: "150K+", label: "Happy Customers" },
  { value: "10K+", label: "Products" },
  { value: "50+", label: "Countries" }
];
