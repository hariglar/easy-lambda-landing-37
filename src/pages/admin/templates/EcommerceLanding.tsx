
import { TemplateContent } from "../types/editor";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { ProductsSection } from "./components/ProductsSection";
import { NewsletterSection } from "./components/NewsletterSection";
import { BenefitsSection } from "./components/BenefitsSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { BrandsSection } from "./components/BrandsSection";
import { CollectionsSection } from "./components/CollectionsSection";
import { FaqsSection } from "./components/FaqsSection";
import { CtaSection } from "./components/CtaSection";
import { StatsSection } from "./components/StatsSection";
import { PromotionBanner } from "./components/PromotionBanner";
import { CategoriesSection } from "./components/CategoriesSection";

interface EcommerceLandingProps {
  content: TemplateContent;
  onContentChange: (section: keyof TemplateContent, value: any, index?: number, field?: string) => void;
  isEditing: boolean;
}

export default function EcommerceLanding({ content, onContentChange, isEditing }: EcommerceLandingProps) {
  return (
    <div className="w-full min-h-screen">
      <PromotionBanner 
        promotion={content.promotion} 
        onContentChange={onContentChange}
        isEditing={isEditing}
      />
      <HeroSection 
        hero={content.hero} 
        onContentChange={onContentChange} 
        isEditing={isEditing} 
      />
      <FeaturesSection 
        features={content.features} 
        onContentChange={onContentChange} 
        isEditing={isEditing} 
      />
      <CategoriesSection
        categories={content.categories}
        onContentChange={onContentChange}
        isEditing={isEditing}
      />
      <ProductsSection 
        products={content.products} 
        onContentChange={onContentChange} 
        isEditing={isEditing} 
      />
      <CollectionsSection
        collections={content.collections}
        onContentChange={onContentChange}
        isEditing={isEditing}
      />
      <BenefitsSection
        benefits={content.benefits}
        onContentChange={onContentChange}
        isEditing={isEditing}
      />
      <StatsSection
        stats={content.stats}
        onContentChange={onContentChange}
        isEditing={isEditing}
      />
      <TestimonialsSection
        testimonials={content.testimonials}
        onContentChange={onContentChange}
        isEditing={isEditing}
      />
      <CtaSection
        cta={content.cta}
        onContentChange={onContentChange}
        isEditing={isEditing}
      />
      <BrandsSection
        brands={content.brands}
        onContentChange={onContentChange}
        isEditing={isEditing}
      />
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
