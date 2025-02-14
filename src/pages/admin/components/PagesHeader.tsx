
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TemplateSelectionDialog } from "./TemplateSelectionDialog";

export function PagesHeader() {
  const navigate = useNavigate();
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Pages</h1>
        <p className="text-muted-foreground mt-2">
          Create and manage your landing pages.
        </p>
      </div>
      <Button onClick={() => setShowTemplateDialog(true)} size="lg">
        Create Page
      </Button>

      <TemplateSelectionDialog 
        open={showTemplateDialog} 
        onOpenChange={setShowTemplateDialog}
      />
    </div>
  );
}
