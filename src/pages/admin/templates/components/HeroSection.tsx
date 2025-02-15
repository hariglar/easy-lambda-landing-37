
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { TemplateContent } from "../../types/editor";
import { EditableText } from "../../components/editor/EditableText";

interface HeroSectionProps {
  hero: TemplateContent['hero'];
  onContentChange: (section: keyof TemplateContent, value: any) => void;
  isEditing: boolean;
}

export function HeroSection({ hero, onContentChange, isEditing }: HeroSectionProps) {
  return (
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
          className="text-5xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700"
          identifier="hero.title"
          isEditing={isEditing}
        />
        <EditableText
          value={hero.subtitle}
          onChange={(value) => onContentChange('hero', { subtitle: value })}
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200"
          identifier="hero.subtitle"
          isEditing={isEditing}
        />
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <Button size="lg" className="min-w-[200px] bg-white text-black hover:bg-white/90">
            <EditableText
              value={hero.ctaText}
              onChange={(value) => onContentChange('hero', { ctaText: value })}
              className="inline-flex items-center"
              identifier="hero.ctaText"
              isEditing={isEditing}
            />
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="min-w-[200px] border-white text-white hover:bg-white/20">
            <EditableText
              value={hero.lookbookText || "View Lookbook"}
              onChange={(value) => onContentChange('hero', { lookbookText: value })}
              className="inline-flex items-center"
              identifier="hero.lookbookText"
              isEditing={isEditing}
            />
          </Button>
        </div>
      </div>
    </section>
  );
}
