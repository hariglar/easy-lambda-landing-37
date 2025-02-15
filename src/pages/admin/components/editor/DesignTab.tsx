
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
              <Switch
                checked={isEditing}
                onCheckedChange={setIsEditing}
              />
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
              <Switch
                checked={isEditing}
                onCheckedChange={setIsEditing}
              />
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
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Page Title</Label>
                  <Input placeholder="Enter page title..." />
                </div>
                <div className="space-y-2">
                  <Label>URL Path</Label>
                  <Input placeholder="Enter URL path..." />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Meta Information</Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setMetaExpanded(!metaExpanded)}
                    >
                      {metaExpanded ? 'Hide' : 'Show'} Meta Info
                    </Button>
                  </div>
                  {metaExpanded && (
                    <div className="space-y-4 animate-in slide-in-from-top-2">
                      <div className="space-y-2">
                        <Label>Meta Title</Label>
                        <Input placeholder="Enter meta title..." />
                      </div>
                      <div className="space-y-2">
                        <Label>Meta Description</Label>
                        <Textarea placeholder="Enter meta description..." />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Choose a Template</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {templates.map((template) => (
                  <Card 
                    key={template.id}
                    className={cn(
                      "group cursor-pointer overflow-hidden transition-all",
                      selectedTemplate === template.id && 'ring-2 ring-primary'
                    )}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={template.thumbnail} 
                        alt={template.name}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      />
                      {selectedTemplate === template.id && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <span className="bg-white text-primary px-3 py-1 rounded-full text-sm font-medium">
                            Selected
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold">{template.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {template.description}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {renderTemplate()}
    </div>
  );
}
