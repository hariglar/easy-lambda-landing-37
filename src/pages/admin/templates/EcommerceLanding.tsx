
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
  const [sections, setSections] = useState<SectionConfig[]>([]);

  useEffect(() => {
    setSections([
      {
        id: 'hero',
        component: (
          <HeroSection
            hero={content.hero}
            onContentChange={onContentChange}
            isEditing={isEditing}
          />
        ),
      },
      {
        id: 'features',
        component: (
          <FeaturesSection
            features={content.features}
            onContentChange={onContentChange}
            isEditing={isEditing}
          />
        ),
      },
      {
        id: 'products',
        component: (
          <ProductsSection
            products={content.products}
            onContentChange={onContentChange}
            isEditing={isEditing}
          />
        ),
      },
      {
        id: 'newsletter',
        component: (
          <NewsletterSection
            newsletter={content.newsletter}
            onContentChange={onContentChange}
            isEditing={isEditing}
          />
        ),
      },
    ]);
  }, [content, onContentChange, isEditing]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
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
