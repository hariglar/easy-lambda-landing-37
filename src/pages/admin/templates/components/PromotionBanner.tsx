
import { TemplateContent } from "../../types/editor";
import { EditableText } from "../../components/editor/EditableText";

interface PromotionBannerProps {
  promotion: TemplateContent['promotion'];
  onContentChange: (section: keyof TemplateContent, value: any, index?: number, field?: string) => void;
  isEditing: boolean;
}

export function PromotionBanner({ promotion, onContentChange, isEditing }: PromotionBannerProps) {
  return (
    <div className="bg-primary text-white text-center py-2 px-4">
      <span className="inline-flex items-center gap-2 text-sm">
        <EditableText
          value={promotion.discount}
          onChange={(value) => onContentChange('promotion', value, undefined, 'discount')}
          className="font-bold"
          identifier="promotion.discount"
          isEditing={isEditing}
        />
        <span>Use code:</span>
        <EditableText
          value={promotion.code}
          onChange={(value) => onContentChange('promotion', value, undefined, 'code')}
          className="font-mono bg-white/20 px-2 py-0.5 rounded"
          identifier="promotion.code"
          isEditing={isEditing}
        />
        <EditableText
          value={promotion.expiry}
          onChange={(value) => onContentChange('promotion', value, undefined, 'expiry')}
          className="text-white/80"
          identifier="promotion.expiry"
          isEditing={isEditing}
        />
      </span>
    </div>
  );
}
