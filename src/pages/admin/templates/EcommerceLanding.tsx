
import { TemplateContent } from "../types/editor";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { ProductsSection } from "./components/ProductsSection";
import { NewsletterSection } from "./components/NewsletterSection";
import { TestimonialsSection } from "./components/TestimonialsSection";

interface EcommerceLandingProps {
  content: TemplateContent;
  onContentChange: (section: keyof TemplateContent, value: any, index?: number, field?: string) => void;
  isEditing: boolean;
}

const SECTION_COMPONENTS = {
  hero: HeroSection,
  features: FeaturesSection,
  products: ProductsSection,
  newsletter: NewsletterSection,
  testimonials: TestimonialsSection
};

export default function EcommerceLanding({ content, onContentChange, isEditing }: EcommerceLandingProps) {
  // Ensure we have a valid section order
  const sectionOrder = Array.isArray(content.sectionOrder) ? content.sectionOrder : [];

  return (
    <div className="w-full min-h-screen">
      {sectionOrder.map((sectionId) => {
        const Component = SECTION_COMPONENTS[sectionId as keyof typeof SECTION_COMPONENTS];
        if (!Component) return null;

        // Pass the correct props based on section type
        return (
          <Component
            key={sectionId}
            {...content[sectionId as keyof TemplateContent]}
            onContentChange={onContentChange}
            isEditing={isEditing}
          />
        );
      })}
    </div>
  );
}
