
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Laptop, Smartphone, Tablet, Eye, Pencil } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface EditorHeaderProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  viewMode: 'desktop' | 'tablet' | 'mobile';
  setViewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  lastSaved?: Date | null;
  onSave?: () => Promise<void>;
  isDirty?: boolean;
  pageUrl?: string;
  pageTitle?: string;
  setPageUrl?: (url: string) => void;
}

export function EditorHeader({
  isEditing,
  setIsEditing,
  viewMode,
  setViewMode,
  lastSaved,
  onSave,
  isDirty,
  pageUrl,
  pageTitle,
  setPageUrl
}: EditorHeaderProps) {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="flex items-center gap-2 flex-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <Pencil className="h-4 w-4 text-primary" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <Switch
                    checked={isEditing}
                    onCheckedChange={setIsEditing}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isEditing ? "Switch to preview mode" : "Switch to editing mode"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-sm font-medium">
            {isEditing ? "Editing Mode" : "Preview Mode"}
          </span>
        </div>
        
        <div className="flex items-center gap-2 border-l pl-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('desktop')}
                  className="transition-all"
                >
                  <Laptop className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Desktop view</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === 'tablet' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('tablet')}
                  className="transition-all"
                >
                  <Tablet className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tablet view</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('mobile')}
                  className="transition-all"
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mobile view</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
