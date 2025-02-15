
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface MetaSettingsProps {
  title: string;
  description: string;
  onMetaChange: (field: 'title' | 'description', value: string) => void;
}

export function MetaSettings({ title, description, onMetaChange }: MetaSettingsProps) {
  return (
    <Card className="p-4">
      <h3 className="font-medium mb-3">Page Settings</h3>
      <div className="space-y-4">
        <div>
          <Label>Meta Title</Label>
          <Input 
            className="mt-1.5" 
            placeholder="Enter meta title..."
            value={title}
            onChange={(e) => onMetaChange('title', e.target.value)}
            maxLength={60}
          />
          <p className={cn(
            "text-xs mt-1",
            title.length > 50 ? "text-yellow-500" : "text-muted-foreground"
          )}>
            {title.length}/60 characters
          </p>
        </div>
        <div>
          <Label>Meta Description</Label>
          <Textarea 
            className="mt-1.5" 
            placeholder="Enter meta description..."
            value={description}
            onChange={(e) => onMetaChange('description', e.target.value)}
            maxLength={160}
          />
          <p className={cn(
            "text-xs mt-1",
            description.length > 145 ? "text-yellow-500" : "text-muted-foreground"
          )}>
            {description.length}/160 characters
          </p>
        </div>
      </div>
    </Card>
  );
}
