
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Globe, Code, Layout, Type, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const templates = [
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
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("design");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/pages")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Create New Page</h1>
            <p className="text-muted-foreground mt-2">
              Design and publish your landing page.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            Preview
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="design">
            <Layout className="w-4 h-4 mr-2" />
            Design
          </TabsTrigger>
          <TabsTrigger value="content">
            <Type className="w-4 h-4 mr-2" />
            Content
          </TabsTrigger>
          <TabsTrigger value="media">
            <ImageIcon className="w-4 h-4 mr-2" />
            Media
          </TabsTrigger>
          <TabsTrigger value="code">
            <Code className="w-4 h-4 mr-2" />
            Code
          </TabsTrigger>
        </TabsList>

        <TabsContent value="design" className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Page Title</Label>
              <Input placeholder="Enter page title..." />
            </div>
            <div className="space-y-2">
              <Label>URL Path</Label>
              <Input placeholder="Enter URL path..." />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Choose a Template</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <Card 
                  key={template.id}
                  className={`group cursor-pointer overflow-hidden transition-all ${
                    selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={template.thumbnail} 
                      alt={template.name}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
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
        </TabsContent>

        <TabsContent value="content" className="min-h-[300px] flex items-center justify-center text-muted-foreground">
          Content editor coming soon...
        </TabsContent>

        <TabsContent value="media" className="min-h-[300px] flex items-center justify-center text-muted-foreground">
          Media library coming soon...
        </TabsContent>

        <TabsContent value="code" className="min-h-[300px] flex items-center justify-center text-muted-foreground">
          Code editor coming soon...
        </TabsContent>
      </Tabs>
    </div>
  );
}
