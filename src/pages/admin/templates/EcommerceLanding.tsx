
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

export function EcommerceLanding({ content, onContentChange, isEditing = false }: EcommerceLandingProps) {
  const defaultOrder = ['hero', 'features', 'products', 'newsletter'];
  const [sections, setSections] = useState<SectionConfig[]>([]);

  const createSections = (orderArray: string[]) => {
    return orderArray.map(id => ({
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

  useEffect(() => {
    const order = content.sectionOrder || defaultOrder;
    setSections(createSections(order));
  }, [content, onContentChange, isEditing]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // Update the section order in the content
        const newOrder = newItems.map(item => item.id);
        onContentChange('sectionOrder', newOrder);
        
        return newItems;
      });
    }
  };

  if (!isEditing) {
    const order = content.sectionOrder || defaultOrder;
    const orderedSections = createSections(order);
    
    return (
      <main>
        {orderedSections.map((section) => (
          <div key={section.id}>{section.component}</div>
        ))}
      </main>
    );
  }

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
