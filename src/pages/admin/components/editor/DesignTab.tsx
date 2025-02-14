
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Template } from "../../types";

interface DesignTabProps {
  templateId: number;
  selectedTemplate: Template | null;
  setSelectedTemplate: (template: Template) => void;
  metaExpanded: boolean;
  setMetaExpanded: (expanded: boolean) => void;
  templates: Template[];
  content: any;
}

export function DesignTab({
  templateId,
  selectedTemplate,
  setSelectedTemplate,
  metaExpanded,
  setMetaExpanded,
  templates,
  content
}: DesignTabProps) {
  return (
    <Card className="p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold mb-4">Template</h3>
          <ScrollArea className="h-[450px] rounded-md border">
            <div className="p-4 grid gap-4">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    templateId === template.id ? 'border-primary' : ''
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <h4 className="font-semibold">{template.name}</h4>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {selectedTemplate && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Template Preview</h3>
            <Card className="aspect-[3/4] relative overflow-hidden">
              <img
                src={selectedTemplate.preview}
                alt={selectedTemplate.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </Card>
          </div>
        )}
      </div>

      <Accordion type="single" defaultValue={metaExpanded ? "meta" : ""}>
        <AccordionItem value="meta">
          <AccordionTrigger onClick={() => setMetaExpanded(!metaExpanded)}>
            SEO & Meta
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Customize your page's meta information for better SEO.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
