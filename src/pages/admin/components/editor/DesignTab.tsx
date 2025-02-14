
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Template } from "../../types";
import EcommerceLanding from "../../templates/EcommerceLanding";
import { TemplateContent } from "../../types/editor";
import { Button } from "@/components/ui/button";
import { Pencil, X } from "lucide-react";
import { useState } from "react";

interface DesignTabProps {
  templateId: string | null;
  selectedTemplate: number | null;
  setSelectedTemplate: (id: number | null) => void;
  metaExpanded: boolean;
  setMetaExpanded: (expanded: boolean) => void;
  templates: Template[];
  content: TemplateContent;
  handleContentChange: (section: keyof TemplateContent, value: any) => void;
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
  const [editingElement, setEditingElement] = useState<string | null>(null);

  const handleEditClick = (element: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingElement(element);
  };

  const handleCloseEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingElement(null);
  };

  const EditOverlay = ({ 
    element, 
    value, 
    onChange 
  }: { 
    element: string; 
    value: string; 
    onChange: (value: string) => void 
  }) => (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md p-4 space-y-4">
        <div className="flex items-center justify-between">
          <Label>Edit {element}</Label>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCloseEdit}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        {element.toLowerCase().includes('description') ? (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[100px]"
          />
        ) : (
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </Card>
    </div>
  );

  const renderTemplate = () => {
    switch (templateId) {
      case "ecommerce":
        return (
          <div className="relative">
            <div className="absolute top-4 right-4 z-50 space-y-2">
              {Object.entries(content.hero).map(([key, value]) => (
                <Button
                  key={key}
                  variant="secondary"
                  size="sm"
                  className="w-full opacity-80 hover:opacity-100"
                  onClick={(e) => handleEditClick(`hero.${key}`, e)}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit {key}
                </Button>
              ))}
            </div>
            <EcommerceLanding content={content} />
            {editingElement && editingElement.startsWith('hero.') && (
              <EditOverlay
                element={editingElement.split('.')[1]}
                value={content.hero[editingElement.split('.')[1] as keyof typeof content.hero] as string}
                onChange={(value) => {
                  handleContentChange('hero', { [editingElement.split('.')[1]]: value });
                  setEditingElement(null);
                }}
              />
            )}
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <Card className="p-6">
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
            </Card>
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
