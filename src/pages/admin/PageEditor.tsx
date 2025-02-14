
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Globe, ImageIcon, Layout, Layers, Type } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { EditorHeader } from "./components/editor/EditorHeader";
import { EditorTabs } from "./components/editor/EditorTabs";
import { DesignTab } from "./components/editor/DesignTab";
import { Template } from "./types";

const templates: Template[] = [
  {
    id: 1,
    name: "Minimal Landing",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop",
    description: "Clean and minimal design perfect for product launches."
  },
  {
    id: 2,
    name: "Business Pro",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
    description: "Professional template for business websites."
  },
  {
    id: 3,
    name: "Creative Portfolio",
    thumbnail: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=200&fit=crop",
    description: "Showcase your work with this creative template."
  }
];

export default function PageEditor() {
  const [searchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState("design");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [metaExpanded, setMetaExpanded] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date());

  const templateId = searchParams.get("template");

  return (
    <div className="space-y-8 animate-in fade-in">
      <EditorHeader lastSaved={lastSaved} />

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
        <EditorTabs />

        <TabsContent value="design" className="space-y-6">
          <DesignTab 
            templateId={templateId}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            metaExpanded={metaExpanded}
            setMetaExpanded={setMetaExpanded}
            templates={templates}
          />
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Main Heading</Label>
                <Input placeholder="Enter main heading..." />
              </div>
              <div className="space-y-2">
                <Label>Subheading</Label>
                <Input placeholder="Enter subheading..." />
              </div>
              <div className="space-y-2">
                <Label>Body Content</Label>
                <Textarea 
                  placeholder="Enter body content..." 
                  className="min-h-[200px]"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="min-h-[300px] space-y-6">
          <Card className="p-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-32 h-32 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <div>
                <Button>Upload Media</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Drag and drop your images here, or click to browse
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="min-h-[300px] space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Custom CSS</Label>
                <Textarea 
                  placeholder="Enter custom CSS..." 
                  className="font-mono min-h-[200px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Custom JavaScript</Label>
                <Textarea 
                  placeholder="Enter custom JavaScript..." 
                  className="font-mono min-h-[200px]"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-6">
          <Card className="p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <Layout className="w-6 h-6" />
                Hero Section
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <Layers className="w-6 h-6" />
                Features Grid
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <Type className="w-6 h-6" />
                Testimonials
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Publishing Status</Label>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Draft</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Page Visibility</Label>
                <Input placeholder="Enter visibility settings..." />
              </div>
              <div className="space-y-2">
                <Label>Cache Settings</Label>
                <Input placeholder="Enter cache duration..." />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
