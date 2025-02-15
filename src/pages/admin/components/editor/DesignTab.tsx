
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Template } from "../../types";
import EcommerceLanding from "../../templates/EcommerceLanding";
import { TemplateContent } from "../../types/editor";
import { Switch } from "@/components/ui/switch";
import { Pencil, Move } from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "@hello-pangea/dnd";

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

  // List of available sections for reordering
  const [sections, setSections] = useState([
    { id: "hero", title: "Hero Section" },
    { id: "features", title: "Features Section" },
    { id: "products", title: "Products Section" },
    { id: "newsletter", title: "Newsletter Section" },
    { id: "testimonials", title: "Testimonials Section" }
  ]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSections(items);
    
    // Update the content with the new order
    console.log("New section order:", items.map(item => item.id));
    // Here you would update your content state with the new order
    handleContentChange('sectionOrder', items.map(item => item.id));
  };

  const renderTemplate = () => {
    switch (templateId) {
      case "ecommerce":
        return (
          <div className="space-y-8">
            <div className="sticky top-4 z-50 flex items-center gap-4 bg-white/90 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <Pencil className={cn("h-4 w-4", isEditing ? "text-primary" : "text-muted-foreground")} />
                <Switch
                  checked={isEditing}
                  onCheckedChange={setIsEditing}
                />
                <span className="text-sm font-medium">
                  {isEditing ? "Editing Mode" : "Preview Mode"}
                </span>
              </div>
            </div>

            {isEditing && (
              <Card className="p-4 mb-8">
                <Label className="mb-4 block">Reorder Sections</Label>
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="sections">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-2"
                      >
                        {sections.map((section, index) => (
                          <Draggable
                            key={section.id}
                            draggableId={section.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="flex items-center gap-2 p-3 bg-muted rounded-md cursor-move hover:bg-muted/80 transition-colors"
                              >
                                <Move className="h-4 w-4 text-muted-foreground" />
                                <span>{section.title}</span>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </Card>
            )}

            <EcommerceLanding 
              content={content} 
              onContentChange={handleContentChange}
              isEditing={isEditing}
            />
          </div>
        );
      default:
        return (
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
        );
    }
  };

  return (
    <div className="space-y-6">
      {renderTemplate()}
    </div>
  );
}
