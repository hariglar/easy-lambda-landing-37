
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CodeTab() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Custom CSS</Label>
          <Textarea 
            placeholder="Enter custom CSS..." 
            className="font-mono min-h-[200px]"
          />
        </div>
        <div className="space-y-2">
          <Label>Custom JavaScript</Label>
          <Textarea 
            placeholder="Enter custom JavaScript..." 
            className="font-mono min-h-[200px]"
          />
        </div>
      </div>
    </Card>
  );
}
