
import { Star } from "lucide-react";
import { TemplateContent } from "../../types/editor";
import { EditableText } from "../../components/editor/EditableText";
import { ImageEditor } from "../../components/editor/ImageEditor";

interface TestimonialsSectionProps {
  testimonials?: TemplateContent['testimonials'];
  onContentChange: (section: keyof TemplateContent, value: any, index: number, field: string) => void;
  isEditing: boolean;
}

export function TestimonialsSection({ testimonials = defaultTestimonials, onContentChange, isEditing }: TestimonialsSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-6 bg-gray-50 rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <ImageEditor
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                  onImageChange={(newSrc) => onContentChange('testimonials', newSrc, index, 'avatar')}
                  isEditing={isEditing}
                />
                <div>
                  <EditableText
                    value={testimonial.name}
                    onChange={(value) => onContentChange('testimonials', value, index, 'name')}
                    className="font-semibold"
                    identifier={`testimonial.${index}.name`}
                    isEditing={isEditing}
                  />
                  <EditableText
                    value={testimonial.role}
                    onChange={(value) => onContentChange('testimonials', value, index, 'role')}
                    className="text-sm text-muted-foreground"
                    identifier={`testimonial.${index}.role`}
                    isEditing={isEditing}
                  />
                </div>
              </div>
              <EditableText
                value={testimonial.content}
                onChange={(value) => onContentChange('testimonials', value, index, 'content')}
                className="mb-4 italic"
                identifier={`testimonial.${index}.content`}
                isEditing={isEditing}
              />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const defaultTestimonials: TemplateContent['testimonials'] = [
  {
    name: "Sarah Johnson",
    role: "Fashion Blogger",
    content: "The quality of their products is exceptional. I'm always impressed with their attention to detail.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Style Consultant",
    content: "A game-changer in luxury fashion. Their collection is both timeless and trendy.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 4.8
  }
];
