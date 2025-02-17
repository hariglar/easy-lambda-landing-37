
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { ArrowUp, ArrowDown } from "lucide-react";
import { PageRow } from "./PageRow";
import { Page, SortDirection, SortField } from "../types/pages";

interface PageTableProps {
  pages: Page[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onDeleteClick: (id: number) => void;
}

export function PageTable({ 
  pages, 
  sortField, 
  sortDirection, 
  onSort, 
  onDeleteClick 
}: PageTableProps) {
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
          <TableHead 
            className="cursor-pointer hover:text-foreground"
            onClick={() => onSort("last_modified")}
          >
            Last Modified
            {sortField === "last_modified" && (
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
          />
        ))}
      </TableBody>
    </Table>
  );
}
