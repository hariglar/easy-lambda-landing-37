
import { useState, useRef, useEffect } from "react";
import { RichTextToolbar } from "./RichTextToolbar";

// Create a global state for tracking the active editor
let activeEditorId: string | null = null;

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  identifier: string;
  isEditing: boolean;
}

export function EditableText({
  value,
  onChange,
  className = "",
  identifier,
  isEditing
}: EditableTextProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    // If this editor becomes editable, make it the active editor
    if (isEditable) {
      // If there's another active editor, we need to close it
      if (activeEditorId && activeEditorId !== identifier) {
        const event = new CustomEvent('closeEditor', { detail: activeEditorId });
        window.dispatchEvent(event);
      }
      activeEditorId = identifier;
    } else if (activeEditorId === identifier) {
      activeEditorId = null;
    }
  }, [isEditable, identifier]);

  // Listen for close events from other editors
  useEffect(() => {
    const handleCloseEditor = (event: CustomEvent<string>) => {
      if (event.detail === identifier) {
        setIsEditable(false);
      }
    };

    window.addEventListener('closeEditor', handleCloseEditor as EventListener);
    return () => {
      window.removeEventListener('closeEditor', handleCloseEditor as EventListener);
    };
  }, [identifier]);

  const handleToolbarAction = (command: string) => {
    document.execCommand(command, false);
    const newContent = editorRef.current?.innerHTML || "";
    setCurrentValue(newContent);
  };

  const handleSave = () => {
    onChange(currentValue);
    setIsEditable(false);
    activeEditorId = null;
  };

  const handleCancel = () => {
    setCurrentValue(value);
    setIsEditable(false);
    activeEditorId = null;
  };

  if (!isEditing) {
    return (
      <div 
        className={className}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  }

  if (!isEditable) {
    return (
      <div
        className={`${className} cursor-pointer hover:ring-2 hover:ring-primary hover:ring-opacity-50 rounded px-1`}
        onClick={() => setIsEditable(true)}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  }

  return (
    <div className="relative group">
      <div className="absolute -top-12 left-0 right-0 z-50 mx-auto w-fit">
        <RichTextToolbar
          onBold={() => handleToolbarAction('bold')}
          onItalic={() => handleToolbarAction('italic')}
          onUnderline={() => handleToolbarAction('underline')}
          onLink={() => {
            const url = window.prompt('Enter URL:');
            if (url) {
              document.execCommand('createLink', false, url);
              const newContent = editorRef.current?.innerHTML || "";
              setCurrentValue(newContent);
            }
          }}
          onBulletList={() => handleToolbarAction('insertUnorderedList')}
          onNumberedList={() => handleToolbarAction('insertOrderedList')}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
      <div
        ref={editorRef}
        className={`${className} outline-none ring-2 ring-primary rounded px-1`}
        contentEditable
        dangerouslySetInnerHTML={{ __html: currentValue }}
        onInput={(e) => setCurrentValue(e.currentTarget.innerHTML)}
      />
    </div>
  );
}
