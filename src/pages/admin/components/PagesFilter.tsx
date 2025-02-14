
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PagesFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: "all" | "published" | "draft";
  onStatusChange: (status: "all" | "published" | "draft") => void;
}

export function PagesFilter({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: PagesFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Input
        placeholder="Search pages..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
      <div className="flex gap-2">
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          onClick={() => onStatusChange("all")}
        >
          All
        </Button>
        <Button
          variant={statusFilter === "published" ? "default" : "outline"}
          onClick={() => onStatusChange("published")}
        >
          Published
        </Button>
        <Button
          variant={statusFilter === "draft" ? "default" : "outline"}
          onClick={() => onStatusChange("draft")}
        >
          Drafts
        </Button>
      </div>
    </div>
  );
}
