
import { useState, useRef } from "react";
import { ImageIcon, Upload, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

interface ImageEditorProps {
  src: string;
  alt?: string;
  className?: string;
  onImageChange: (newSrc: string) => void;
  isEditing: boolean;
}

export function ImageEditor({ src, alt = "", className = "", onImageChange, isEditing }: ImageEditorProps) {
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewSrc(result);
        onImageChange(result);
        toast.success("Image updated successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const mockImageLibrary = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop",
  ];

  if (!isEditing) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
      />
    );
  }

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={previewSrc || src}
        alt={alt}
        className={`${className} ${isHovered ? 'opacity-50' : ''} transition-opacity duration-200`}
      />
      
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-1" />
            Upload
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary" size="sm">
                <FolderOpen className="w-4 h-4 mr-1" />
                Library
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid grid-cols-3 gap-2 p-2">
                {mockImageLibrary.map((imgSrc, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-md hover:ring-2 hover:ring-primary cursor-pointer"
                    onClick={() => {
                      setPreviewSrc(imgSrc);
                      onImageChange(imgSrc);
                      toast.success("Image updated from library");
                    }}
                  >
                    <img
                      src={imgSrc}
                      alt={`Library image ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
      
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
