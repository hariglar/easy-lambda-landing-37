
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Search, AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
  };
}

interface SEOPanelProps {
  seoData: SEOData;
  onSEOChange: (data: SEOData) => void;
}

export function SEOPanel({ seoData, onSEOChange }: SEOPanelProps) {
  const [seoScore, setSeoScore] = useState(85);

  const analyzeSEO = () => {
    const issues: string[] = [];
    let score = 100;

    if (seoData.title.length < 30) {
      issues.push("Title is too short (recommended: 30-60 characters)");
      score -= 10;
    }
    if (seoData.description.length < 120) {
      issues.push("Description is too short (recommended: 120-160 characters)");
      score -= 10;
    }
    if (!seoData.keywords) {
      issues.push("No keywords specified");
      score -= 5;
    }
    if (!seoData.openGraph.image) {
      issues.push("No Open Graph image specified");
      score -= 5;
    }

    setSeoScore(score);
    return issues;
  };

  const issues = analyzeSEO();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Search className="w-4 h-4 mr-2" />
          SEO Optimization
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>SEO Settings</SheetTitle>
          <SheetDescription>
            Optimize your page for search engines
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">SEO Score</span>
              <span className="text-sm font-medium">{seoScore}%</span>
            </div>
            <Progress value={seoScore} className="h-2" />
          </div>

          {issues.length > 0 && (
            <Alert variant="warning">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc pl-4 mt-2 space-y-1">
                  {issues.map((issue, index) => (
                    <li key={index} className="text-sm">{issue}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Meta Title</label>
              <Input
                value={seoData.title}
                onChange={(e) =>
                  onSEOChange({ ...seoData, title: e.target.value })
                }
                placeholder="Enter meta title..."
              />
              <p className="text-xs text-muted-foreground">
                {seoData.title.length}/60 characters
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Meta Description</label>
              <Textarea
                value={seoData.description}
                onChange={(e) =>
                  onSEOChange({ ...seoData, description: e.target.value })
                }
                placeholder="Enter meta description..."
              />
              <p className="text-xs text-muted-foreground">
                {seoData.description.length}/160 characters
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Keywords</label>
              <Input
                value={seoData.keywords}
                onChange={(e) =>
                  onSEOChange({ ...seoData, keywords: e.target.value })
                }
                placeholder="Enter keywords, separated by commas..."
              />
            </div>

            <div className="space-y-4 border-t pt-4">
              <h4 className="font-medium">Open Graph Settings</h4>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">OG Title</label>
                <Input
                  value={seoData.openGraph.title}
                  onChange={(e) =>
                    onSEOChange({
                      ...seoData,
                      openGraph: { ...seoData.openGraph, title: e.target.value },
                    })
                  }
                  placeholder="Enter Open Graph title..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">OG Description</label>
                <Textarea
                  value={seoData.openGraph.description}
                  onChange={(e) =>
                    onSEOChange({
                      ...seoData,
                      openGraph: {
                        ...seoData.openGraph,
                        description: e.target.value,
                      },
                    })
                  }
                  placeholder="Enter Open Graph description..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">OG Image URL</label>
                <Input
                  value={seoData.openGraph.image}
                  onChange={(e) =>
                    onSEOChange({
                      ...seoData,
                      openGraph: { ...seoData.openGraph, image: e.target.value },
                    })
                  }
                  placeholder="Enter Open Graph image URL..."
                />
              </div>
            </div>
          </div>

          {seoScore >= 90 && (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                Great job! Your page is well-optimized for search engines.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
