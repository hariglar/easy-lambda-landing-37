
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EcommerceLanding from "../templates/EcommerceLanding";
import { Database } from "@/integrations/supabase/types";
import { TemplateContent } from "../types/editor";

interface PagePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  page: Database['public']['Tables']['pages']['Row'];
}

export function PagePreviewDialog({ open, onOpenChange, page }: PagePreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen-xl h-[90vh] overflow-y-auto">
        <EcommerceLanding
          content={page.content as unknown as TemplateContent}
          onContentChange={() => {}}
          isEditing={false}
        />
      </DialogContent>
    </Dialog>
  );
}
