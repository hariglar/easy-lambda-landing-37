
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Store, 
  ShoppingBag, 
  Medal,
  Gem,
  Sparkle 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: "luxury",
    name: "Luxury Boutique",
    description: "High-end fashion and luxury goods with elegant design",
    icon: Gem,
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
  },
  {
    id: "artisan",
    name: "Artisan Marketplace",
    description: "Handcrafted goods with rustic, authentic feel",
    icon: Medal,
    thumbnail: "https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?w=400&h=300&fit=crop"
  },
  {
    id: "modern",
    name: "Modern Fashion",
    description: "Contemporary fashion with minimalist aesthetic",
    icon: ShoppingBag,
    thumbnail: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop"
  },
  {
    id: "lifestyle",
    name: "Lifestyle Brand",
    description: "Curated collection for modern living",
    icon: Sparkle,
    thumbnail: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop"
  },
  {
    id: "ecommerce",
    name: "Classic Store",
    description: "Traditional e-commerce with proven layout",
    icon: Store,
    thumbnail: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=300&fit=crop"
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
              className="h-[280px] p-0 overflow-hidden hover:border-primary/50 transition-colors"
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
