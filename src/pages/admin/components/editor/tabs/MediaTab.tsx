
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";

export function MediaTab() {
  return (
    <Card className="p-6">
      <div className="text-center space-y-4">
        <div className="mx-auto w-32 h-32 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
        </div>
        <div>
          <Button>Upload Media</Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Drag and drop your images here, or click to browse
        </p>
      </div>
    </Card>
  );
}
