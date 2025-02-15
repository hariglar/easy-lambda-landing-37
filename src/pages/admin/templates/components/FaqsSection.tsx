
import { TemplateContent } from "../../types/editor";
import { EditableText } from "../../components/editor/EditableText";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqsSectionProps {
  faqs: TemplateContent['faqs'];
  onContentChange: (section: keyof TemplateContent, value: any, index: number, field: string) => void;
  isEditing: boolean;
}

export function FaqsSection({ faqs, onContentChange, isEditing }: FaqsSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`} className="border rounded-lg px-4">
              <AccordionTrigger className="text-left">
                <EditableText
                  value={faq.question}
                  onChange={(value) => onContentChange('faqs', value, index, 'question')}
                  className="text-lg font-medium"
                  identifier={`faq.${index}.question`}
                  isEditing={isEditing}
                />
              </AccordionTrigger>
              <AccordionContent>
                <EditableText
                  value={faq.answer}
                  onChange={(value) => onContentChange('faqs', value, index, 'answer')}
                  className="text-muted-foreground"
                  identifier={`faq.${index}.answer`}
                  isEditing={isEditing}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
