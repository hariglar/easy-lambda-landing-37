
import { TemplateContent } from "../types/editor";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { ProductsSection } from "./components/ProductsSection";
import { NewsletterSection } from "./components/NewsletterSection";
import { CategoriesSection } from "./components/CategoriesSection";
import { BrandsSection } from "./components/BrandsSection";

interface ArtisanMarketplaceProps {
  content: TemplateContent;
  onContentChange: (section: keyof TemplateContent, value: any, index?: number, field?: string) => void;
  isEditing: boolean;
}

export default function ArtisanMarketplace({ content, onContentChange, isEditing }: ArtisanMarketplaceProps) {
  return (
    <div className="w-full min-h-screen bg-[#FBF7F4]">
      <HeroSection 
        hero={{
          ...content.hero,
          backgroundImage: "https://images.unsplash.com/photo-1470309864661-68328b2cd0a5"
        }}
        onContentChange={onContentChange} 
        isEditing={isEditing}
      />
      <div className="bg-white/50">
        <FeaturesSection 
          features={content.features} 
          onContentChange={onContentChange} 
          isEditing={isEditing}
        />
      </div>
      <CategoriesSection
        categories={content.categories}
        onContentChange={onContentChange}
        isEditing={isEditing}
      />
      <div className="max-w-7xl mx-auto px-4">
        <ProductsSection 
          products={{
            ...content.products,
            sectionTitle: "Handcrafted Pieces"
          }}
          onContentChange={onContentChange} 
          isEditing={isEditing}
        />
      </div>
      <BrandsSection
        brands={content.brands}
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
