
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ThemeColor {
  id: string;
  color: string;
  name: string;
}

interface ThemeSelectorProps {
  colors: ThemeColor[];
  selectedTheme: string;
  onThemeChange: (themeId: string) => void;
}

export function ThemeSelector({ colors, selectedTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <Card className="p-4">
      <h3 className="font-medium mb-3">Theme</h3>
      <div className="grid gap-4">
        <div>
          <Label>Primary Color</Label>
          <div className="flex gap-2 mt-1.5">
            {colors.map((theme) => (
              <TooltipProvider key={theme.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "h-8 w-8 p-0 rounded-full transition-all",
                        selectedTheme === theme.id && "ring-2 ring-offset-2 ring-primary"
                      )}
                      style={{ backgroundColor: theme.color }}
                      onClick={() => onThemeChange(theme.id)}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{theme.name} theme</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
