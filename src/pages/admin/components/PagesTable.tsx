
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { ArrowUp, ArrowDown } from "lucide-react";
import { PageRow } from "./PageRow";
import { Category } from "../types/categories";
import { PageWithCategory } from "../types/categories";

type SortField = "title" | "status" | "lastModified" | "views";

interface PagesTableProps {
  pages: PageWithCategory[];
  categories: Category[];
  sortField: SortField;
  sortDirection: "asc" | "desc";
  onSort: (field: SortField) => void;
  onDeleteClick: (id: number) => void;
  onCategoryChange: (pageId: number, categoryId: number | null) => void;
}

export function PagesTable({
  pages,
  categories,
  sortField,
  sortDirection,
  onSort,
  onDeleteClick,
  onCategoryChange,
}: PagesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead 
            className="cursor-pointer hover:text-foreground"
            onClick={() => onSort("title")}
          >
            Title
            {sortField === "title" && (
              sortDirection === "asc" ? <ArrowUp className="w-4 h-4 inline ml-2" /> : <ArrowDown className="w-4 h-4 inline ml-2" />
            )}
          </TableHead>
          <TableHead>URL</TableHead>
          <TableHead 
            className="cursor-pointer hover:text-foreground"
            onClick={() => onSort("status")}
          >
            Status
            {sortField === "status" && (
              sortDirection === "asc" ? <ArrowUp className="w-4 h-4 inline ml-2" /> : <ArrowDown className="w-4 h-4 inline ml-2" />
            )}
          </TableHead>
          <TableHead>Category</TableHead>
          <TableHead 
            className="cursor-pointer hover:text-foreground"
            onClick={() => onSort("lastModified")}
          >
            Last Modified
            {sortField === "lastModified" && (
              sortDirection === "asc" ? <ArrowUp className="w-4 h-4 inline ml-2" /> : <ArrowDown className="w-4 h-4 inline ml-2" />
            )}
          </TableHead>
          <TableHead 
            className="cursor-pointer hover:text-foreground"
            onClick={() => onSort("views")}
          >
            Views
            {sortField === "views" && (
              sortDirection === "asc" ? <ArrowUp className="w-4 h-4 inline ml-2" /> : <ArrowDown className="w-4 h-4 inline ml-2" />
            )}
          </TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pages.map((page) => (
          <PageRow 
            key={page.id} 
            page={page} 
            onDeleteClick={onDeleteClick}
            categories={categories}
            onCategoryChange={onCategoryChange}
          />
        ))}
      </TableBody>
    </Table>
  );
}
