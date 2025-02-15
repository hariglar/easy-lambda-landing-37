
import { TemplateContent } from "../../types/editor";
import { EditableText } from "../../components/editor/EditableText";
import { ImageEditor } from "../../components/editor/ImageEditor";
import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  cta?: TemplateContent['cta'];
  onContentChange: (section: keyof TemplateContent, value: any, index?: number, field?: string) => void;
  isEditing: boolean;
}

export function CtaSection({ cta = defaultCta, onContentChange, isEditing }: CtaSectionProps) {
  return (
    <section className="relative h-[500px] overflow-hidden">
      <ImageEditor
        src={cta.backgroundImage}
        alt="CTA background"
        className="absolute inset-0 w-full h-full object-cover"
        onImageChange={(value) => onContentChange('cta', value, undefined, 'backgroundImage')}
        isEditing={isEditing}
      />
      <div className="absolute inset-0 bg-black/50">
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <div className="max-w-2xl text-center text-white">
            <EditableText
              value={cta.title}
              onChange={(value) => onContentChange('cta', value, undefined, 'title')}
              className="text-4xl font-bold mb-4"
              identifier="cta.title"
              isEditing={isEditing}
            />
            <EditableText
              value={cta.description}
              onChange={(value) => onContentChange('cta', value, undefined, 'description')}
              className="text-lg mb-8"
              identifier="cta.description"
              isEditing={isEditing}
            />
            <Button size="lg" variant="default">
              <EditableText
                value={cta.buttonText}
                onChange={(value) => onContentChange('cta', value, undefined, 'buttonText')}
                className="text-base"
                identifier="cta.buttonText"
                isEditing={isEditing}
              />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const defaultCta: TemplateContent['cta'] = {
  title: "Special Offer",
  description: "Don't miss out on our latest collection",
  buttonText: "Shop Now",
  backgroundImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=900&fit=crop"
};
