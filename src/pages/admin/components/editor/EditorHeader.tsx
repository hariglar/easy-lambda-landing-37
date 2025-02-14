
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Eye, Save, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EditorHeaderProps {
  lastSaved: Date | null;
}

export function EditorHeader({ lastSaved }: EditorHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/pages")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Create New Page</h1>
          <p className="text-muted-foreground mt-2">
            Design and publish your landing page.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {lastSaved && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            Last saved {lastSaved.toLocaleTimeString()}
          </div>
        )}
        <Button variant="outline">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
