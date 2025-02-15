
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Template } from "../../types";
import EcommerceLanding from "../../templates/EcommerceLanding";
import { TemplateContent } from "../../types/editor";
import { Switch } from "@/components/ui/switch";
import { Pencil, Move, Palette, PlayCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [selectedAnimation, setSelectedAnimation] = useState("none");
  const [selectedColor, setSelectedColor] = useState("#000000");

  // List of available sections for reordering
  const sections = [
    { id: "hero", title: "Hero Section" },
    { id: "features", title: "Features Section" },
    { id: "products", title: "Products Section" },
    { id: "newsletter", title: "Newsletter Section" },
    { id: "testimonials", title: "Testimonials Section" }
  ];

  const animations = [
    { id: "none", name: "No Animation" },
    { id: "fade-in", name: "Fade In" },
    { id: "slide-in", name: "Slide In" },
    { id: "scale-in", name: "Scale In" },
    { id: "bounce", name: "Bounce" }
  ];

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the content with the new order
    console.log("New section order:", items.map(item => item.id));
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

              {isEditing && activeSection && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <PlayCircle className="h-4 w-4 text-muted-foreground" />
                    <Select
                      value={selectedAnimation}
                      onValueChange={setSelectedAnimation}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Choose animation" />
                      </SelectTrigger>
                      <SelectContent>
                        {animations.map((animation) => (
                          <SelectItem key={animation.id} value={animation.id}>
                            {animation.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-[100px] h-8 p-1"
                    />
                  </div>
                </div>
              )}
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
                                className="flex items-center gap-2 p-3 bg-muted rounded-md cursor-move hover:bg-muted/80"
                                onClick={() => setActiveSection(section.id)}
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
