
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Globe, ImageIcon, Layout, Layers, Type } from "lucide-react";
import { EditorHeader } from "./components/editor/EditorHeader";
import { EditorTabs } from "./components/editor/EditorTabs";
import { DesignTab } from "./components/editor/DesignTab";
import { templates } from "./data/mockData";
import { useEditor } from "./hooks/useEditor";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function PageEditor() {
  const [searchParams] = useSearchParams();
  const templateParam = searchParams.get('template');

  const {
    currentTab,
    setCurrentTab,
    selectedTemplate,
    setSelectedTemplate,
    metaExpanded,
    setMetaExpanded,
    lastSaved,
    content,
    isDirty,
    setIsDirty,
    templateId,
    pageTitle,
    setPageTitle,
    pageUrl,
    setPageUrl,
    handleContentChange,
    handleSave,
    setTemplateType
  } = useEditor();

  // Set initial template type from URL parameter
  useEffect(() => {
    if (templateParam) {
      console.log('Setting initial template from URL:', templateParam);
      setTemplateType(templateParam);
    }
  }, [templateParam, setTemplateType]);

  return (
    <div className="space-y-8 animate-in fade-in">
      <EditorHeader 
        lastSaved={lastSaved}
        onSave={handleSave}
        isDirty={isDirty}
        pageUrl={pageUrl}
        pageTitle={pageTitle}
        setPageUrl={setPageUrl}
      />

      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Page Title</Label>
            <Input
              value={pageTitle}
              onChange={(e) => {
                setPageTitle(e.target.value);
                setIsDirty(true);
              }}
              placeholder="Enter page title..."
            />
          </div>
          <div className="space-y-2">
            <Label>Page URL</Label>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">/</span>
              <Input
                value={pageUrl.startsWith('/') ? pageUrl.slice(1) : pageUrl}
                onChange={(e) => {
                  setPageUrl('/' + e.target.value.replace(/^\/*/, ''));
                  setIsDirty(true);
                }}
                placeholder="page-url"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              The URL should be unique and contain only letters, numbers, and hyphens
            </p>
          </div>
        </div>
      </Card>

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
            handleContentChange={handleContentChange}
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
