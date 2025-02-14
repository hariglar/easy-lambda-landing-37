
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Save, 
  Globe, 
  Code, 
  Layout, 
  Type, 
  Image as ImageIcon,
  Layers,
  Settings,
  Eye,
  Share2,
  Clock
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import EcommerceLanding from "./templates/EcommerceLanding";

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
  const [searchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState("design");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [metaExpanded, setMetaExpanded] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date());

  const templateId = searchParams.get("template");

  const renderTemplate = () => {
    switch (templateId) {
      case "ecommerce":
        return <EcommerceLanding />;
      default:
        return null;
    }
  };

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
          {lastSaved && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              Last saved {lastSaved.toLocaleTimeString()}
            </div>
          )}
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 lg:w-[600px]">
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
          <TabsTrigger value="components">
            <Layers className="w-4 h-4 mr-2" />
            Components
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="design" className="space-y-6">
          {templateId ? (
            <div className="w-full min-h-[600px] border rounded-lg overflow-hidden">
              {renderTemplate()}
            </div>
          ) : (
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
          )}
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
