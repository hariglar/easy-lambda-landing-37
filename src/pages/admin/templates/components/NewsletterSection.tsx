
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { RichTextEditor } from "../../components/editor/RichTextEditor";
import { TemplateContent } from "../../types/editor";

interface NewsletterSectionProps {
  newsletter: TemplateContent['newsletter'];
  onContentChange: (section: keyof TemplateContent, value: any) => void;
  isEditing: boolean;
}

export function NewsletterSection({ newsletter, onContentChange, isEditing }: NewsletterSectionProps) {
  const EditableContent = ({ 
    value, 
    onChange,
    className = "",
    identifier
  }: { 
    value: string;
    onChange: (value: string) => void;
    className?: string;
    identifier: string;
  }) => {
    if (!isEditing) {
      return <div className={className} dangerouslySetInnerHTML={{ __html: value }} />;
    }

    return (
      <RichTextEditor
        content={value}
        onChange={onChange}
        className={className}
      />
    );
  };

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <EditableContent
            value={newsletter.title}
            onChange={(value) => onContentChange('newsletter', { ...newsletter, title: value })}
            className="text-3xl font-bold mb-4 block"
            identifier="newsletter.title"
          />
          <EditableContent
            value={newsletter.description}
            onChange={(value) => onContentChange('newsletter', { ...newsletter, description: value })}
            className="mb-8 text-primary-foreground/80 block"
            identifier="newsletter.description"
          />
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            {isEditing ? (
              <div className="relative flex-1">
                <Input 
                  type="email" 
                  placeholder={newsletter.placeholderText}
                  className="bg-white text-black"
                />
                <div className="absolute inset-0 flex items-center">
                  <EditableContent
                    value={newsletter.placeholderText}
                    onChange={(value) => onContentChange('newsletter', { ...newsletter, placeholderText: value })}
                    className="text-black px-3 w-full"
                    identifier="newsletter.placeholderText"
                  />
                </div>
              </div>
            ) : (
              <Input 
                type="email" 
                placeholder={newsletter.placeholderText}
                className="bg-white text-black"
              />
            )}
            <Button variant="secondary" className="whitespace-nowrap">
              <EditableContent
                value={newsletter.buttonText || "Subscribe"}
                onChange={(value) => onContentChange('newsletter', { ...newsletter, buttonText: value })}
                className="inline-flex items-center"
                identifier="newsletter.buttonText"
              />
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
