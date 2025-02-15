
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TemplateContent } from "../../types/editor";

interface ContentTabProps {
  content: TemplateContent;
  handleContentChange: (section: keyof TemplateContent, value: any, index?: number, field?: string) => void;
}

export function ContentTab({ content, handleContentChange }: ContentTabProps) {
  return (
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

        {/* Features Section */}
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

        {/* Products Section */}
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

        {/* Newsletter Section */}
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
  );
}
