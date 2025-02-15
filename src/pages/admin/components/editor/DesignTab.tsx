
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Template } from "../../types";
import EcommerceLanding from "../../templates/EcommerceLanding";
import EcommerceLanding2 from "../../templates/EcommerceLanding2";
import { TemplateContent } from "../../types/editor";
import { Switch } from "@/components/ui/switch";
import { Pencil } from "lucide-react";

interface DesignTabProps {
  templateId: string | null;
  selectedTemplate: number | null;
  setSelectedTemplate: (id: number | null) => void;
  metaExpanded: boolean;
  setMetaExpanded: (expanded: boolean) => void;
  templates: Template[];
  content: TemplateContent;
  handleContentChange: (section: keyof TemplateContent, value: any, index?: number, field?: string) => void;
}

export function DesignTab({
  templateId,
  selectedTemplate,
  setSelectedTemplate,
  metaExpanded,
  setMetaExpanded,
  templates,
  content,
  handleContentChange
}: DesignTabProps) {
  const [isEditing, setIsEditing] = useState(false);

  const renderTemplate = () => {
    switch (templateId) {
      case "ecommerce":
        return (
          <div className="relative">
            <div className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-white/90 p-2 rounded-lg shadow-sm">
              <Pencil className={cn("h-4 w-4", isEditing ? "text-primary" : "text-muted-foreground")} />
              <Switch checked={isEditing} onCheckedChange={setIsEditing} />
              <span className="text-sm font-medium">
                {isEditing ? "Editing Mode" : "Preview Mode"}
              </span>
            </div>
            <EcommerceLanding 
              content={content} 
              onContentChange={handleContentChange}
              isEditing={isEditing}
            />
          </div>
        );
      case "ecommerce-2":
        return (
          <div className="relative">
            <div className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-white/90 p-2 rounded-lg shadow-sm">
              <Pencil className={cn("h-4 w-4", isEditing ? "text-primary" : "text-muted-foreground")} />
              <Switch checked={isEditing} onCheckedChange={setIsEditing} />
              <span className="text-sm font-medium">
                {isEditing ? "Editing Mode" : "Preview Mode"}
              </span>
            </div>
            <EcommerceLanding2 
              content={content} 
              onContentChange={handleContentChange}
              isEditing={isEditing}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderTemplate()}
    </div>
  );
}
