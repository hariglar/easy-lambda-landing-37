
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { ProductsSection } from "./components/ProductsSection";
import { NewsletterSection } from "./components/NewsletterSection";
import { TemplateContent } from "../types/editor";
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { DraggableSection } from "../components/editor/DraggableSection";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface EcommerceLandingProps {
  content: TemplateContent;
  onContentChange: (section: keyof TemplateContent, value: any) => void;
  isEditing?: boolean;
}

type SectionConfig = {
  id: string;
  component: JSX.Element;
};

const defaultOrder = ['hero', 'features', 'products', 'newsletter'];

export function EcommerceLanding({ content, onContentChange, isEditing = false }: EcommerceLandingProps) {
  const [sections, setSections] = useState<SectionConfig[]>([]);
  const [order, setOrder] = useState<string[]>(content?.sectionOrder || defaultOrder);

  // Create sections based on current order
  const createSections = (currentOrder: string[]) => {
    return currentOrder.map(id => ({
      id,
      component: (() => {
        switch (id) {
          case 'hero':
            return (
              <HeroSection
                hero={content.hero}
                onContentChange={onContentChange}
                isEditing={isEditing}
              />
            );
          case 'features':
            return (
              <FeaturesSection
                features={content.features}
                onContentChange={onContentChange}
                isEditing={isEditing}
              />
            );
          case 'products':
            return (
              <ProductsSection
                products={content.products}
                onContentChange={onContentChange}
                isEditing={isEditing}
              />
            );
          case 'newsletter':
            return (
              <NewsletterSection
                newsletter={content.newsletter}
                onContentChange={onContentChange}
                isEditing={isEditing}
              />
            );
          default:
            return null;
        }
      })(),
    })).filter((section): section is SectionConfig => section.component !== null);
  };

  // Update sections when content or order changes
  useEffect(() => {
    const newOrder = content?.sectionOrder || defaultOrder;
    setOrder(newOrder);
    setSections(createSections(newOrder));
  }, [content, isEditing]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = order.indexOf(active.id.toString());
      const newIndex = order.indexOf(over.id.toString());
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(order, oldIndex, newIndex);
        
        // Update local state
        setOrder(newOrder);
        setSections(createSections(newOrder));
        
        // Notify parent component
        onContentChange('sectionOrder', newOrder);
        
        // Show success toast
        toast.success("Section order updated");
      }
    }
  };

  if (!isEditing) {
    return (
      <main>
        {sections.map((section) => (
          <div key={section.id}>{section.component}</div>
        ))}
      </main>
    );
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <main>
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          {sections.map((section) => (
            <DraggableSection key={section.id} id={section.id}>
              {section.component}
            </DraggableSection>
          ))}
        </SortableContext>
      </main>
    </DndContext>
  );
}
