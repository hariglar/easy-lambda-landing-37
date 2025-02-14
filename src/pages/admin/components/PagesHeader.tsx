
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function PagesHeader() {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Pages</h1>
        <p className="text-muted-foreground mt-2">
          Create and manage your landing pages.
        </p>
      </div>
      <Button onClick={() => navigate("/admin/pages/new")} size="lg">
        Create Page
      </Button>
    </div>
  );
}
