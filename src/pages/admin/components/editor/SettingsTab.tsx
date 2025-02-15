
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Globe } from "lucide-react";

export function SettingsTab() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Publishing Status</Label>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">Draft</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Page Visibility</Label>
          <Input placeholder="Enter visibility settings..." />
        </div>
        <div className="space-y-2">
          <Label>Cache Settings</Label>
          <Input placeholder="Enter cache duration..." />
        </div>
      </div>
    </Card>
  );
}
