
import { useState, useRef, useEffect } from "react";
import { RichTextToolbar } from "./RichTextToolbar";

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
    if (isEditable && editorRef.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
      editorRef.current.focus();
    }
  }, [isEditable]);

  const handleToolbarAction = (command: string) => {
    document.execCommand(command, false);
    if (editorRef.current) {
      setCurrentValue(editorRef.current.innerHTML);
    }
  };

  const handleSave = () => {
    onChange(currentValue);
    setIsEditable(false);
  };

  const handleCancel = () => {
    setCurrentValue(value);
    setIsEditable(false);
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setCurrentValue(target.innerHTML);
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
              if (editorRef.current) {
                setCurrentValue(editorRef.current.innerHTML);
              }
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
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: currentValue }}
        style={{
          direction: 'ltr',
          unicodeBidi: 'embed',
          textAlign: 'left'
        }}
      />
    </div>
  );
}
