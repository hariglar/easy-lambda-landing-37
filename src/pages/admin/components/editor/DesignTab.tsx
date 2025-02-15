
import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Template } from "../../types";
import EcommerceLanding from "../../templates/EcommerceLanding";
import { TemplateContent } from "../../types/editor";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { 
  Pencil, 
  Layout, 
  Eye, 
  Paintbrush, 
  Settings2, 
  Laptop,
  Smartphone,
  Tablet,
  GripVertical,
  EyeOff
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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

const AVAILABLE_SECTIONS = [
  { id: 'hero', name: 'Hero Section', enabled: true },
  { id: 'features', name: 'Features Section', enabled: true },
  { id: 'products', name: 'Products Section', enabled: true },
  { id: 'newsletter', name: 'Newsletter Section', enabled: true },
  { id: 'testimonials', name: 'Testimonials Section', enabled: true }
];

const THEME_COLORS = [
  { id: 'primary', color: '#8B5CF6', name: 'Purple' },
  { id: 'blue', color: '#0EA5E9', name: 'Blue' },
  { id: 'green', color: '#22C55E', name: 'Green' },
  { id: 'rose', color: '#F43F5E', name: 'Rose' }
];

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
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [enabledSections, setEnabledSections] = useState(
    AVAILABLE_SECTIONS.map(section => section.enabled)
  );
  const [selectedTheme, setSelectedTheme] = useState('primary');

  const handleSectionToggle = useCallback((index: number) => {
    setEnabledSections(prev => {
      const newEnabled = [...prev];
      newEnabled[index] = !newEnabled[index];
      
      // Ensure at least one section is enabled
      if (newEnabled.filter(Boolean).length === 0) {
        toast.error("At least one section must be enabled");
        return prev;
      }
      
      return newEnabled;
    });
  }, []);

  const handleThemeChange = useCallback((themeId: string) => {
    setSelectedTheme(themeId);
    const themeColor = THEME_COLORS.find(t => t.id === themeId)?.color;
    if (themeColor) {
      document.documentElement.style.setProperty('--primary', themeColor);
      toast.success(`Theme updated to ${THEME_COLORS.find(t => t.id === themeId)?.name}`);
    }
  }, []);

  const renderTemplate = () => {
    switch (templateId) {
      case "ecommerce":
        return (
          <div className="space-y-6">
            <Card className="sticky top-4 z-50 shadow-md">
              <div className="border-b">
                <div className="flex h-16 items-center px-4 gap-4">
                  <div className="flex items-center gap-2 flex-1">
                    {isEditing ? (
                      <Pencil className="h-4 w-4 text-primary" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Switch
                      checked={isEditing}
                      onCheckedChange={setIsEditing}
                    />
                    <span className="text-sm font-medium">
                      {isEditing ? "Editing Mode" : "Preview Mode"}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 border-l pl-4">
                    <Button
                      variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('desktop')}
                      className="transition-all"
                    >
                      <Laptop className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'tablet' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('tablet')}
                      className="transition-all"
                    >
                      <Tablet className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('mobile')}
                      className="transition-all"
                    >
                      <Smartphone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {isEditing && (
                <Tabs defaultValue="layout" className="p-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="layout">
                      <Layout className="h-4 w-4 mr-2" />
                      Layout
                    </TabsTrigger>
                    <TabsTrigger value="style">
                      <Paintbrush className="h-4 w-4 mr-2" />
                      Style
                    </TabsTrigger>
                    <TabsTrigger value="settings">
                      <Settings2 className="h-4 w-4 mr-2" />
                      Settings
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="layout" className="space-y-4 mt-4">
                    <div className="grid gap-4">
                      <Card className="p-4">
                        <h3 className="font-medium mb-3">Section Visibility</h3>
                        <div className="space-y-3">
                          {AVAILABLE_SECTIONS.map((section, index) => (
                            <div key={section.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                                <span>{section.name}</span>
                              </div>
                              <Switch
                                checked={enabledSections[index]}
                                onCheckedChange={() => handleSectionToggle(index)}
                              />
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="style" className="space-y-4 mt-4">
                    <Card className="p-4">
                      <h3 className="font-medium mb-3">Theme</h3>
                      <div className="grid gap-4">
                        <div>
                          <Label>Primary Color</Label>
                          <div className="flex gap-2 mt-1.5">
                            {THEME_COLORS.map((theme) => (
                              <Button
                                key={theme.id}
                                variant="outline"
                                size="sm"
                                className={cn(
                                  "h-8 w-8 p-0 rounded-full transition-all",
                                  selectedTheme === theme.id && "ring-2 ring-offset-2 ring-primary"
                                )}
                                style={{ backgroundColor: theme.color }}
                                onClick={() => handleThemeChange(theme.id)}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>
                  <TabsContent value="settings" className="space-y-4 mt-4">
                    <Card className="p-4">
                      <h3 className="font-medium mb-3">Page Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <Label>Meta Title</Label>
                          <Input 
                            className="mt-1.5" 
                            placeholder="Enter meta title..."
                            onChange={(e) => handleContentChange('meta', { title: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Meta Description</Label>
                          <Textarea 
                            className="mt-1.5" 
                            placeholder="Enter meta description..."
                            onChange={(e) => handleContentChange('meta', { description: e.target.value })}
                          />
                        </div>
                      </div>
                    </Card>
                  </TabsContent>
                </Tabs>
              )}
            </Card>

            <div className={cn(
              "mx-auto transition-all duration-200",
              viewMode === 'desktop' ? 'max-w-none' : 
              viewMode === 'tablet' ? 'max-w-[768px]' : 
              'max-w-[375px]',
              !isEditing && 'pt-8'
            )}>
              <EcommerceLanding 
                content={content} 
                onContentChange={handleContentChange}
                isEditing={isEditing}
              />
            </div>
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
