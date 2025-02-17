
import { Database } from "@/integrations/supabase/types";

export type Page = Database['public']['Tables']['pages']['Row'];
export type SortField = "title" | "status" | "last_modified" | "views";
export type SortDirection = "asc" | "desc";

export const PAGE_SIZE_OPTIONS = [
  { value: "5", label: "5 per page" },
  { value: "10", label: "10 per page" },
  { value: "20", label: "20 per page" },
  { value: "50", label: "50 per page" },
  { value: "100", label: "100 per page" },
  { value: "all", label: "Show all" }
] as const;
