
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { defaultContent } from "./admin/types/editor";
import EcommerceLanding from "./admin/templates/EcommerceLanding";

export default function Preview() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [content, setContent] = useState(defaultContent);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const previewData = sessionStorage.getItem('previewData');
    if (previewData) {
      setContent(JSON.parse(previewData));
    }
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50"
        onClick={() => navigate(-1)}
      >
        <X className="h-4 w-4" />
      </Button>

      <div style={{ width: dimensions.width, height: dimensions.height }}>
        <EcommerceLanding 
          content={content} 
          onContentChange={() => {}} 
          isEditing={false}
        />
      </div>
    </div>
  );
}
