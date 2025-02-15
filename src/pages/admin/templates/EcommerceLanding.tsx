
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { ProductsSection } from "./components/ProductsSection";
import { NewsletterSection } from "./components/NewsletterSection";
import { TemplateContent } from "../types/editor";
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { DraggableSection } from "../components/editor/DraggableSection";
import { useState, useEffect } from "react";

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

  const createSections = (orderArray: unknown) => {
    // Ensure orderArray is a valid array, otherwise use default order
    const validOrder = Array.isArray(orderArray) ? orderArray : defaultOrder;
    
    return validOrder.map(id => ({
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

  // Update sections when content or editing mode changes
  useEffect(() => {
    const order = Array.isArray(content?.sectionOrder) ? content.sectionOrder : defaultOrder;
    setSections(createSections(order));
  }, [content, isEditing, onContentChange]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      // First update the sections state
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        // Create new array with updated order
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // Get the new order of section IDs
        const newOrder = newItems.map(item => item.id);
        
        // Update the content with the new order
        onContentChange('sectionOrder', newOrder);
        
        return newItems;
      });
    }
  };

  // Render preview mode
  if (!isEditing) {
    const order = Array.isArray(content?.sectionOrder) ? content.sectionOrder : defaultOrder;
    const orderedSections = createSections(order);
    
    return (
      <main>
        {orderedSections.map((section) => (
          <div key={section.id}>{section.component}</div>
        ))}
      </main>
    );
  }

  // Render editing mode with drag and drop
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <main>
        <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
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
