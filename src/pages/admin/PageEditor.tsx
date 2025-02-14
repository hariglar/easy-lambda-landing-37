import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Globe, ImageIcon, Layout, Layers, Type } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { EditorHeader } from "./components/editor/EditorHeader";
import { EditorTabs } from "./components/editor/EditorTabs";
import { DesignTab } from "./components/editor/DesignTab";
import { Template } from "./types";
import { toast } from "sonner";

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

export interface TemplateContent {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    backgroundImage: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
  products: Array<{
    name: string;
    price: string;
    image: string;
    rating: number;
  }>;
  newsletter: {
    title: string;
    description: string;
  };
}

const defaultContent: TemplateContent = {
  hero: {
    title: "Discover Luxury Fashion",
    subtitle: "Explore our curated collection of premium fashion and accessories",
    ctaText: "Shop Now",
    backgroundImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=800&fit=crop"
  },
  features: [
    { title: "Free Shipping", description: "On orders over $50" },
    { title: "Easy Returns", description: "30-day return policy" },
    { title: "Secure Payments", description: "100% secure checkout" }
  ],
  products: [
    {
      name: "Premium Watch",
      price: "$299",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
    },
    {
      name: "Designer Handbag",
      price: "$199",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop"
    },
    {
      name: "Wireless Earbuds",
      price: "$159",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop"
    }
  ],
  newsletter: {
    title: "Subscribe to Our Newsletter",
    description: "Get exclusive offers and be the first to know about new arrivals"
  }
};

export default function PageEditor() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState("design");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [metaExpanded, setMetaExpanded] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date());
  const [content, setContent] = useState<TemplateContent>(defaultContent);
  const [isDirty, setIsDirty] = useState(false);

  const templateId = searchParams.get("template");

  const handleContentChange = (
    section: keyof TemplateContent,
    value: any,
    index?: number,
    field?: string
  ) => {
    setIsDirty(true);
    setContent(prev => {
      const newContent = { ...prev };
      if (index !== undefined && field && Array.isArray(newContent[section])) {
        (newContent[section] as any[])[index] = {
          ...(newContent[section] as any[])[index],
          [field]: value
        };
      } else if (typeof value === "object") {
        newContent[section] = { ...newContent[section], ...value };
      } else {
        newContent[section] = value;
      }
      return newContent;
    });
  };

  const handleSave = async () => {
    try {
      // Here you would typically make an API call to save the content
      // For now, we'll just simulate a save
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLastSaved(new Date());
      setIsDirty(false);
      toast.success("Changes saved successfully!");
    } catch (error) {
      toast.error("Failed to save changes. Please try again.");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      <EditorHeader 
        lastSaved={lastSaved}
        onSave={handleSave}
        isDirty={isDirty}
      />

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
            content={content}
          />
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Hero Section</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input 
                      value={content.hero.title}
                      onChange={(e) => handleContentChange('hero', { title: e.target.value })}
                      placeholder="Enter hero title..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Subtitle</Label>
                    <Textarea 
                      value={content.hero.subtitle}
                      onChange={(e) => handleContentChange('hero', { subtitle: e.target.value })}
                      placeholder="Enter hero subtitle..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>CTA Text</Label>
                    <Input 
                      value={content.hero.ctaText}
                      onChange={(e) => handleContentChange('hero', { ctaText: e.target.value })}
                      placeholder="Enter call to action text..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Background Image URL</Label>
                    <Input 
                      value={content.hero.backgroundImage}
                      onChange={(e) => handleContentChange('hero', { backgroundImage: e.target.value })}
                      placeholder="Enter image URL..."
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Features</h3>
                {content.features.map((feature, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Feature {index + 1} Title</Label>
                        <Input 
                          value={feature.title}
                          onChange={(e) => handleContentChange('features', e.target.value, index, 'title')}
                          placeholder="Enter feature title..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Feature {index + 1} Description</Label>
                        <Input 
                          value={feature.description}
                          onChange={(e) => handleContentChange('features', e.target.value, index, 'description')}
                          placeholder="Enter feature description..."
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Products</h3>
                {content.products.map((product, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Product {index + 1} Name</Label>
                        <Input 
                          value={product.name}
                          onChange={(e) => handleContentChange('products', e.target.value, index, 'name')}
                          placeholder="Enter product name..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Product {index + 1} Price</Label>
                        <Input 
                          value={product.price}
                          onChange={(e) => handleContentChange('products', e.target.value, index, 'price')}
                          placeholder="Enter product price..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Product {index + 1} Rating</Label>
                        <Input 
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={product.rating}
                          onChange={(e) => handleContentChange('products', parseFloat(e.target.value), index, 'rating')}
                          placeholder="Enter product rating..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Product {index + 1} Image URL</Label>
                        <Input 
                          value={product.image}
                          onChange={(e) => handleContentChange('products', e.target.value, index, 'image')}
                          placeholder="Enter product image URL..."
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Newsletter Section</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input 
                      value={content.newsletter.title}
                      onChange={(e) => handleContentChange('newsletter', { title: e.target.value })}
                      placeholder="Enter newsletter title..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea 
                      value={content.newsletter.description}
                      onChange={(e) => handleContentChange('newsletter', { description: e.target.value })}
                      placeholder="Enter newsletter description..."
                    />
                  </div>
                </div>
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
