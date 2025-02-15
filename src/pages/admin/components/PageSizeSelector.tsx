
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PAGE_SIZE_OPTIONS } from "../constants/pageConstants";

interface PageSizeSelectorProps {
  pageSize: string;
  onPageSizeChange: (value: string) => void;
}

export function PageSizeSelector({ pageSize, onPageSizeChange }: PageSizeSelectorProps) {
  return (
    <Select
      value={pageSize}
      onValueChange={onPageSizeChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select page size" />
      </SelectTrigger>
      <SelectContent>
        {PAGE_SIZE_OPTIONS.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
