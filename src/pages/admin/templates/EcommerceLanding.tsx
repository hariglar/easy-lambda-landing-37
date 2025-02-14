import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingBag,
  Star,
  ArrowRight,
  Heart,
  ShieldCheck,
  Truck,
  RefreshCw
} from "lucide-react";
import { TemplateContent } from "../types/editor";
import { useState } from "react";
import { RichTextEditor } from '../components/editor/RichTextEditor';

interface EcommerceLandingProps {
  content: TemplateContent;
  onContentChange: (section: keyof TemplateContent, value: any, index?: number, field?: string) => void;
  isEditing: boolean;
}

export default function EcommerceLanding({ content, onContentChange, isEditing }: EcommerceLandingProps) {
  const { hero, features, products, newsletter } = content;
  const [editingField, setEditingField] = useState<string | null>(null);

  const EditableContent = ({ 
    value, 
    onChange,
    className = "",
    identifier
  }: { 
    value: string;
    onChange: (value: string) => void;
    className?: string;
    identifier: string;
  }) => {
    if (!isEditing) {
      return <div className={className} dangerouslySetInnerHTML={{ __html: value }} />;
    }

    return (
      <RichTextEditor
        content={value}
        onChange={onChange}
        className={className}
      />
    );
  };

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: hero.backgroundImage ? `url("${hero.backgroundImage}")` : 'none',
            backgroundColor: !hero.backgroundImage ? 'rgb(15 23 42)' : undefined,
          }} 
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <EditableContent
            value={hero.title}
            onChange={(value) => onContentChange('hero', { title: value })}
            className="text-5xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700"
            identifier="hero.title"
          />
          <EditableContent
            value={hero.subtitle}
            onChange={(value) => onContentChange('hero', { subtitle: value })}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200"
            identifier="hero.subtitle"
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Button size="lg" className="min-w-[200px] bg-white text-black hover:bg-white/90">
              <EditableContent
                value={hero.ctaText}
                onChange={(value) => onContentChange('hero', { ctaText: value })}
                className="inline-flex items-center"
                identifier="hero.ctaText"
              />
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="min-w-[200px] border-white text-white hover:bg-white/20">
              <EditableContent
                value={hero.lookbookText || "View Lookbook"}
                onChange={(value) => onContentChange('hero', { lookbookText: value })}
                className="inline-flex items-center"
                identifier="hero.lookbookText"
              />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = [Truck, RefreshCw, ShieldCheck][index];
              return (
                <div 
                  key={index}
                  className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <Icon className="h-12 w-12 text-primary mb-4" />
                  <EditableContent
                    value={feature.title}
                    onChange={(value) => onContentChange('features', value, index, 'title')}
                    className="text-lg font-semibold mb-2"
                    identifier={`feature.${index}.title`}
                  />
                  <EditableContent
                    value={feature.description}
                    onChange={(value) => onContentChange('features', value, index, 'description')}
                    className="text-muted-foreground"
                    identifier={`feature.${index}.description`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <EditableContent
            value="Featured Products"
            onChange={(value) => onContentChange('products', { sectionTitle: value })}
            className="text-3xl font-bold text-center mb-12"
            type="heading"
            identifier="products.sectionTitle"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-lg shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <EditableContent
                    value={product.name}
                    onChange={(value) => onContentChange('products', value, index, 'name')}
                    className="text-lg font-semibold mb-2 block"
                    identifier={`product.${index}.name`}
                  />
                  <div className="flex items-center justify-between mb-4">
                    <EditableContent
                      value={product.price}
                      onChange={(value) => onContentChange('products', value, index, 'price')}
                      className="text-primary font-bold"
                      identifier={`product.${index}.price`}
                    />
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm text-muted-foreground">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  <Button className="w-full">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    <EditableContent
                      value="Add to Cart"
                      onChange={(value) => onContentChange('products', value, index, 'buttonText')}
                      className="inline-flex items-center"
                      identifier={`product.${index}.buttonText`}
                    />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <EditableContent
              value={newsletter.title}
              onChange={(value) => onContentChange('newsletter', { title: value })}
              className="text-3xl font-bold mb-4 block"
              type="heading"
              identifier="newsletter.title"
            />
            <EditableContent
              value={newsletter.description}
              onChange={(value) => onContentChange('newsletter', { description: value })}
              className="mb-8 text-primary-foreground/80 block"
              identifier="newsletter.description"
            />
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              {isEditing ? (
                <div className="relative flex-1">
                  <Input 
                    type="email" 
                    placeholder={newsletter.placeholderText}
                    className="bg-white text-black"
                  />
                  <div className="absolute inset-0 flex items-center">
                    <EditableContent
                      value={newsletter.placeholderText}
                      onChange={(value) => onContentChange('newsletter', { placeholderText: value })}
                      className="text-black px-3 w-full"
                      identifier="newsletter.placeholderText"
                    />
                  </div>
                </div>
              ) : (
                <Input 
                  type="email" 
                  placeholder={newsletter.placeholderText}
                  className="bg-white text-black"
                />
              )}
              <Button variant="secondary" className="whitespace-nowrap">
                <EditableContent
                  value={newsletter.buttonText || "Subscribe"}
                  onChange={(value) => onContentChange('newsletter', { buttonText: value })}
                  className="inline-flex items-center"
                  identifier="newsletter.buttonText"
                />
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
