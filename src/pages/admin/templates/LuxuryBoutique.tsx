
import { TemplateContent } from "../types/editor";
import { HeroSection } from "./components/HeroSection";
import { ProductsSection } from "./components/ProductsSection";
import { NewsletterSection } from "./components/NewsletterSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { StatsSection } from "./components/StatsSection";
import { PromotionBanner } from "./components/PromotionBanner";

interface LuxuryBoutiqueProps {
  content: TemplateContent;
  onContentChange: (section: keyof TemplateContent, value: any, index?: number, field?: string) => void;
  isEditing: boolean;
}

export default function LuxuryBoutique({ content, onContentChange, isEditing }: LuxuryBoutiqueProps) {
  return (
    <div className="w-full min-h-screen bg-[#FDFBF7]">
      <PromotionBanner 
        promotion={content.promotion} 
        onContentChange={onContentChange}
        isEditing={isEditing}
      />
      <HeroSection 
        hero={{
          ...content.hero,
          backgroundImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8"
        }}
        onContentChange={onContentChange} 
        isEditing={isEditing}
      />
      <div className="max-w-7xl mx-auto">
        <ProductsSection 
          products={{
            ...content.products,
            sectionTitle: "Curated Collection"
          }}
          onContentChange={onContentChange} 
          isEditing={isEditing}
        />
      </div>
      <TestimonialsSection
        testimonials={content.testimonials}
        onContentChange={onContentChange}
        isEditing={isEditing}
      />
      <StatsSection
        stats={content.stats}
        onContentChange={onContentChange}
        isEditing={isEditing}
      />
      <div className="bg-primary/5">
        <NewsletterSection 
          newsletter={content.newsletter} 
          onContentChange={onContentChange} 
          isEditing={isEditing}
        />
      </div>
    </div>
  );
}
