
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

type SectionComponent = {
  component: React.ComponentType<any>;
  propsKey: keyof TemplateContent;
};

const SECTION_COMPONENTS: Record<string, SectionComponent> = {
  hero: { component: HeroSection, propsKey: 'hero' },
  features: { component: FeaturesSection, propsKey: 'features' },
  products: { component: ProductsSection, propsKey: 'products' },
  newsletter: { component: NewsletterSection, propsKey: 'newsletter' },
  testimonials: { component: TestimonialsSection, propsKey: 'testimonials' }
};

export default function EcommerceLanding({ content, onContentChange, isEditing }: EcommerceLandingProps) {
  // Ensure we have a valid section order
  const sectionOrder = Array.isArray(content.sectionOrder) ? content.sectionOrder : [];

  return (
    <div className="w-full min-h-screen">
      {sectionOrder.map((sectionId) => {
        const sectionConfig = SECTION_COMPONENTS[sectionId];
        if (!sectionConfig) return null;

        const { component: Component, propsKey } = sectionConfig;

        // Get the specific props for this section type
        const sectionProps = {
          [propsKey]: content[propsKey],
          onContentChange,
          isEditing
        };

        return (
          <Component
            key={sectionId}
            {...sectionProps}
          />
        );
      })}
    </div>
  );
}
