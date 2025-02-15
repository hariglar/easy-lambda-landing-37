
import { TemplateContent } from "../types/editor";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { ProductsSection } from "./components/ProductsSection";
import { NewsletterSection } from "./components/NewsletterSection";

interface EcommerceLandingProps {
  content: TemplateContent;
  onContentChange: (section: keyof TemplateContent, value: any, index?: number, field?: string) => void;
  isEditing: boolean;
}

export default function EcommerceLanding({ content, onContentChange, isEditing }: EcommerceLandingProps) {
  const { hero, features, products, newsletter } = content;

  return (
    <div className="w-full min-h-screen">
      <HeroSection 
        hero={hero} 
        onContentChange={onContentChange} 
        isEditing={isEditing} 
      />
      <FeaturesSection 
        features={features} 
        onContentChange={onContentChange} 
        isEditing={isEditing} 
      />
      <ProductsSection 
        products={products} 
        onContentChange={onContentChange} 
        isEditing={isEditing} 
      />
      <NewsletterSection 
        newsletter={newsletter} 
        onContentChange={onContentChange} 
        isEditing={isEditing} 
      />
    </div>
  );
}
