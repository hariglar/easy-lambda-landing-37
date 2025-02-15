import { useState, useCallback, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Template } from "../../types";
import EcommerceLanding from "../../templates/EcommerceLanding";
import { TemplateContent } from "../../types/editor";
import { toast } from "sonner";
import { Layout, Paintbrush, Settings2 } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { EditorHeader } from "./EditorHeader";
import { SectionManager } from "./SectionManager";
import { ThemeSelector } from "./ThemeSelector";
import { MetaSettings } from "./MetaSettings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AVAILABLE_SECTIONS = [
  { id: 'hero', name: 'Hero Section' },
  { id: 'features', name: 'Features Section' },
  { id: 'products', name: 'Products Section' },
  { id: 'newsletter', name: 'Newsletter Section' },
  { id: 'testimonials', name: 'Testimonials Section' }
] as const;

const THEME_COLORS = [
  { id: 'primary', color: '#8B5CF6', name: 'Purple' },
  { id: 'blue', color: '#0EA5E9', name: 'Blue' },
  { id: 'green', color: '#22C55E', name: 'Green' },
  { id: 'rose', color: '#F43F5E', name: 'Rose' }
] as const;

interface DesignTabProps {
  templateId: string;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  metaExpanded: boolean;
  setMetaExpanded: (expanded: boolean) => void;
  templates: Template[];
  content: TemplateContent;
  handleContentChange: (field: keyof TemplateContent, value: any) => void;
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
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [enabledSections, setEnabledSections] = useState(() => 
    AVAILABLE_SECTIONS.map(section => ({
      ...section,
      enabled: content[section.id]?.visible !== false
    }))
  );
  const [selectedTheme, setSelectedTheme] = useState(() => {
    const saved = localStorage.getItem('selected-theme');
    return saved || 'primary';
  });

  const handleSectionToggle = useCallback((index: number) => {
    setEnabledSections(prev => {
      const newSections = [...prev];
      const section = newSections[index];
      const newEnabled = !section.enabled;

      if (!newEnabled && !prev.some((s, i) => i !== index && s.enabled)) {
        toast.error("At least one section must remain visible");
        return prev;
      }

      newSections[index] = { ...section, enabled: newEnabled };
      
      const sectionId = section.id as keyof TemplateContent;
      if (content[sectionId]) {
        handleContentChange(sectionId, {
          ...content[sectionId],
          visible: newEnabled
        });
      }

      return newSections;
    });
  }, [content, handleContentChange]);

  const handleThemeChange = useCallback((themeId: string) => {
    try {
      const theme = THEME_COLORS.find(t => t.id === themeId);
      if (!theme) throw new Error("Invalid theme");

      setSelectedTheme(themeId);
      document.documentElement.style.setProperty('--primary', theme.color);
      localStorage.setItem('selected-theme', themeId);

      handleContentChange('theme', {
        primaryColor: theme.color,
        name: theme.name
      });

      toast.success(`Theme updated to ${theme.name}`);
    } catch (error) {
      toast.error("Failed to update theme");
    }
  }, [handleContentChange]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('selected-theme');
    if (savedTheme) {
      handleThemeChange(savedTheme);
    }
  }, [handleThemeChange]);

  const handleMetaChange = useCallback((field: 'title' | 'description', value: string) => {
    handleContentChange('meta', {
      ...content.meta,
      [field]: value
    });
  }, [content.meta, handleContentChange]);

  if (templateId === "ecommerce") {
    return (
      <div className="space-y-6">
        <Card className="sticky top-4 z-50 shadow-md">
          <EditorHeader
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

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
                <SectionManager
                  sections={enabledSections}
                  onSectionToggle={handleSectionToggle}
                />
              </TabsContent>

              <TabsContent value="style" className="space-y-4 mt-4">
                <ThemeSelector
                  colors={THEME_COLORS}
                  selectedTheme={selectedTheme}
                  onThemeChange={handleThemeChange}
                />
              </TabsContent>

              <TabsContent value="settings" className="space-y-4 mt-4">
                <MetaSettings
                  title={content.meta.title}
                  description={content.meta.description}
                  onMetaChange={handleMetaChange}
                />
              </TabsContent>
            </Tabs>
          )}
        </Card>

        <div className={cn(
          "mx-auto transition-all duration-300",
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
  }

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
          {/* Meta Information Section */}
          <div className="space-y-2">
            {/* Meta Information Toggle */}
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
            {/* Meta Information Fields */}
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
