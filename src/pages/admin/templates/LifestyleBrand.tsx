
import { TemplateContent } from "../types/editor";
import { HeroSection } from "./components/HeroSection";
import { ProductsSection } from "./components/ProductsSection";
import { NewsletterSection } from "./components/NewsletterSection";
import { BenefitsSection } from "./components/BenefitsSection";
import { FaqsSection } from "./components/FaqsSection";

interface LifestyleBrandProps {
  content: TemplateContent;
  onContentChange: (section: keyof TemplateContent, value: any, index?: number, field?: string) => void;
  isEditing: boolean;
}

export default function LifestyleBrand({ content, onContentChange, isEditing }: LifestyleBrandProps) {
  return (
    <div className="w-full min-h-screen bg-[#F6F8FA]">
      <HeroSection 
        hero={{
          ...content.hero,
          backgroundImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b"
        }}
        onContentChange={onContentChange} 
        isEditing={isEditing}
      />
      <BenefitsSection
        benefits={content.benefits}
        onContentChange={onContentChange}
        isEditing={isEditing}
      />
      <div className="bg-white">
        <div className="container mx-auto px-4">
          <ProductsSection 
            products={{
              ...content.products,
              sectionTitle: "Featured Lifestyle Products"
            }}
            onContentChange={onContentChange} 
            isEditing={isEditing}
          />
        </div>
      </div>
      <FaqsSection
        faqs={content.faqs}
        onContentChange={onContentChange}
        isEditing={isEditing}
      />
      <NewsletterSection 
        newsletter={content.newsletter} 
        onContentChange={onContentChange} 
        isEditing={isEditing}
      />
    </div>
  );
}
