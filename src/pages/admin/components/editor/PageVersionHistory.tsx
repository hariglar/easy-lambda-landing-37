
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, RotateCcw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface Version {
  id: string;
  timestamp: Date;
  title: string;
  changes: string[];
}

interface PageVersionHistoryProps {
  versions: Version[];
  onRestoreVersion: (versionId: string) => void;
}

export function PageVersionHistory({ versions, onRestoreVersion }: PageVersionHistoryProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <History className="w-4 h-4 mr-2" />
          Version History
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Version History</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-120px)] mt-4">
          <div className="space-y-4">
            {versions.map((version) => (
              <div
                key={version.id}
                className="p-4 border rounded-lg space-y-2 hover:bg-accent"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{version.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(version.timestamp, { addSuffix: true })}
                  </span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {version.changes.map((change, i) => (
                    <li key={i}>• {change}</li>
                  ))}
                </ul>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => {
                    onRestoreVersion(version.id);
                    toast.success("Version restored successfully!");
                  }}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restore this version
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
