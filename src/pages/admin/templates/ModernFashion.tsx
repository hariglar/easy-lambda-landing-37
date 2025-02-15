
import { TemplateContent } from "../types/editor";
import { HeroSection } from "./components/HeroSection";
import { ProductsSection } from "./components/ProductsSection";
import { NewsletterSection } from "./components/NewsletterSection";
import { CollectionsSection } from "./components/CollectionsSection";
import { CtaSection } from "./components/CtaSection";

interface ModernFashionProps {
  content: TemplateContent;
  onContentChange: (section: keyof TemplateContent, value: any, index?: number, field?: string) => void;
  isEditing: boolean;
}

export default function ModernFashion({ content, onContentChange, isEditing }: ModernFashionProps) {
  return (
    <div className="w-full min-h-screen bg-[#F8F9FA]">
      <HeroSection 
        hero={{
          ...content.hero,
          backgroundImage: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04"
        }}
        onContentChange={onContentChange} 
        isEditing={isEditing}
      />
      <div className="container mx-auto px-4">
        <CollectionsSection
          collections={content.collections}
          onContentChange={onContentChange}
          isEditing={isEditing}
        />
      </div>
      <div className="bg-white">
        <ProductsSection 
          products={{
            ...content.products,
            sectionTitle: "New Arrivals"
          }}
          onContentChange={onContentChange} 
          isEditing={isEditing}
        />
      </div>
      <CtaSection
        cta={content.cta}
        onContentChange={onContentChange}
        isEditing={isEditing}
      />
      <div className="bg-primary text-white">
        <NewsletterSection 
          newsletter={content.newsletter} 
          onContentChange={onContentChange} 
          isEditing={isEditing}
        />
      </div>
    </div>
  );
}
