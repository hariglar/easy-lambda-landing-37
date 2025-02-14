
import { Bold, Italic, Underline, Link, List, ListOrdered, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RichTextToolbarProps {
  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  onLink: () => void;
  onBulletList: () => void;
  onNumberedList: () => void;
  onSave: () => void;
  onCancel: () => void;
  className?: string;
}

export function RichTextToolbar({
  onBold,
  onItalic,
  onUnderline,
  onLink,
  onBulletList,
  onNumberedList,
  onSave,
  onCancel,
  className
}: RichTextToolbarProps) {
  return (
    <div className={cn(
      "flex items-center gap-1 p-1 bg-white border rounded-lg shadow-sm",
      className
    )}>
      <div className="flex items-center gap-0.5 border-r pr-1">
        <Button variant="ghost" size="sm" onClick={onBold} className="h-8 w-8 p-0">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onItalic} className="h-8 w-8 p-0">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onUnderline} className="h-8 w-8 p-0">
          <Underline className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onLink} className="h-8 w-8 p-0">
          <Link className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-0.5 border-r pr-1">
        <Button variant="ghost" size="sm" onClick={onBulletList} className="h-8 w-8 p-0">
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onNumberedList} className="h-8 w-8 p-0">
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-0.5">
        <Button variant="ghost" size="sm" onClick={onSave} className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50">
          <Save className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onCancel} className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
