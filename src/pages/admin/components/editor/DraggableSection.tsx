
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface DraggableSectionProps {
  id: string;
  children: React.ReactNode;
}

export function DraggableSection({ id, children }: DraggableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: 'relative' as const,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div ref={setNodeRef} style={style} className="group">
      <div
        {...attributes}
        {...listeners}
        className="absolute left-4 top-4 z-50 hidden cursor-grab rounded-md border bg-background p-2 opacity-0 group-hover:opacity-100 group-hover:block"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      {children}
    </div>
  );
}
