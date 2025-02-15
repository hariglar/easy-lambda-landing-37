
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  LayoutTemplate, 
  Rocket, 
  Building2, 
  Palette, 
  Store,
  ShoppingBag
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: "minimal",
    name: "Minimal Landing",
    description: "Clean and modern design for startups",
    icon: LayoutTemplate,
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop"
  },
  {
    id: "startup",
    name: "Startup Launch",
    description: "Perfect for product launches and SaaS",
    icon: Rocket,
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
  },
  {
    id: "business",
    name: "Business Pro",
    description: "Professional template for enterprises",
    icon: Building2,
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop"
  },
  {
    id: "creative",
    name: "Creative Portfolio",
    description: "Showcase your work with style",
    icon: Palette,
    thumbnail: "https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?w=400&h=300&fit=crop"
  },
  {
    id: "ecommerce",
    name: "E-commerce Landing",
    description: "Designed for online stores",
    icon: Store,
    thumbnail: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=300&fit=crop"
  },
  {
    id: "ecommerce-2",
    name: "E-commerce Landing 2",
    description: "Alternative design for online stores",
    icon: ShoppingBag,
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
  }
];

interface TemplateSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TemplateSelectionDialog({
  open,
  onOpenChange
}: TemplateSelectionDialogProps) {
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId: string) => {
    navigate(`/admin/pages/new?template=${templateId}`);
    onOpenChange(false); // Close the dialog after selection
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Choose a Template</DialogTitle>
          <DialogDescription>
            Select a pre-made template to start with. You can customize it later.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {templates.map((template) => (
            <Button
              key={template.id}
              variant="outline"
              className="h-[280px] p-0 overflow-hidden"
              onClick={() => handleTemplateSelect(template.id)}
            >
              <div className="w-full h-full flex flex-col">
                <div className="relative w-full h-40 overflow-hidden">
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <div className="p-4 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <template.icon className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">{template.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
