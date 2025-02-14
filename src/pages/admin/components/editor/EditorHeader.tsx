
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe } from "lucide-react";
import { EditorHeaderActions } from "./EditorHeaderActions";
import { PublishDialog } from "./PublishDialog";
import { useState } from "react";
import { TemplateContent } from "../../types/editor";

interface EditorHeaderProps {
  lastSaved: Date | null;
  onSave: () => Promise<void>;
  isDirty: boolean;
  pageUrl: string;
  pageTitle: string;
  setPageUrl: (url: string) => void;
  content: TemplateContent;
}

export function EditorHeader({ 
  lastSaved, 
  onSave, 
  isDirty, 
  pageUrl,
  pageTitle,
  setPageUrl,
  content
}: EditorHeaderProps) {
  const [showPublishDialog, setShowPublishDialog] = useState(false);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">{pageTitle}</h1>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Globe className="w-4 h-4 mr-2" />
            {pageUrl}
          </Button>
        </div>

        <EditorHeaderActions
          lastSaved={lastSaved}
          onSave={onSave}
          isDirty={isDirty}
          pageUrl={pageUrl}
          onPublish={() => setShowPublishDialog(true)}
          content={content}
        />
      </div>

      <PublishDialog
        open={showPublishDialog}
        onOpenChange={setShowPublishDialog}
        pageUrl={pageUrl}
        onUrlChange={setPageUrl}
      />
    </Card>
  );
}
