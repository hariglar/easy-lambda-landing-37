
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

interface EcommerceLandingProps {
  content: TemplateContent;
  onContentChange: (section: keyof TemplateContent, value: any, index?: number, field?: string) => void;
  isEditing: boolean;
}

export default function EcommerceLanding({ content, onContentChange, isEditing }: EcommerceLandingProps) {
  const { hero, features, products, newsletter } = content;
  const [editingField, setEditingField] = useState<string | null>(null);

  const EditableText = ({ 
    value, 
    onChange, 
    className = "", 
    type = "text",
    identifier
  }: { 
    value: string; 
    onChange: (value: string) => void; 
    className?: string;
    type?: "text" | "heading";
    identifier: string;
  }) => {
    if (!isEditing) {
      return <span className={className}>{value}</span>;
    }

    const isEditing = editingField === identifier;
    
    return isEditing ? (
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${className} !bg-white/90 !border-primary`}
        autoFocus
        onBlur={() => setEditingField(null)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setEditingField(null);
          }
        }}
      />
    ) : (
      <div
        className={`${className} cursor-pointer relative group`}
        onClick={() => setEditingField(identifier)}
      >
        <span>{value}</span>
        {isEditing && (
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
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
          <EditableText
            value={hero.title}
            onChange={(value) => onContentChange('hero', { title: value })}
            className="text-5xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 block"
            type="heading"
            identifier="hero.title"
          />
          <EditableText
            value={hero.subtitle}
            onChange={(value) => onContentChange('hero', { subtitle: value })}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 block"
            identifier="hero.subtitle"
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Button size="lg" className="min-w-[200px] bg-white text-black hover:bg-white/90">
              <EditableText
                value={hero.ctaText}
                onChange={(value) => onContentChange('hero', { ctaText: value })}
                className="inline-flex items-center"
                identifier="hero.ctaText"
              />
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="min-w-[200px] border-white text-white hover:bg-white/20">
              View Lookbook
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
                  <EditableText
                    value={feature.title}
                    onChange={(value) => onContentChange('features', value, index, 'title')}
                    className="text-lg font-semibold mb-2"
                    identifier={`feature.${index}.title`}
                  />
                  <EditableText
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

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <EditableText
              value={newsletter.title}
              onChange={(value) => onContentChange('newsletter', { title: value })}
              className="text-3xl font-bold mb-4 block"
              type="heading"
              identifier="newsletter.title"
            />
            <EditableText
              value={newsletter.description}
              onChange={(value) => onContentChange('newsletter', { description: value })}
              className="mb-8 text-primary-foreground/80 block"
              identifier="newsletter.description"
            />
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="bg-white text-black"
              />
              <Button variant="secondary" className="whitespace-nowrap">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
