
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { TemplateContent } from "../../types/editor";

interface Section {
  id: string;
  name: string;
  enabled: boolean;
}

interface SectionManagerProps {
  sections: Section[];
  onSectionToggle: (index: number) => void;
}

export function SectionManager({ sections, onSectionToggle }: SectionManagerProps) {
  return (
    <Card className="p-4">
      <h3 className="font-medium mb-3">Section Visibility</h3>
      <div className="space-y-3">
        {sections.map((section, index) => (
          <div 
            key={section.id} 
            className={cn(
              "flex items-center justify-between p-2 rounded-lg transition-colors",
              section.enabled ? "bg-muted/50" : "bg-muted/20"
            )}
          >
            <div className="flex items-center gap-3">
              <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
              <span className={cn(
                section.enabled ? "text-foreground" : "text-muted-foreground"
              )}>
                {section.name}
              </span>
            </div>
            <Switch
              checked={section.enabled}
              onCheckedChange={() => onSectionToggle(index)}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
