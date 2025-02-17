
import { useState, useEffect } from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PagesHeader } from "./components/PagesHeader";
import { PagesFilter } from "./components/PagesFilter";
import { PageRow } from "./components/PageRow";
import { DeletePageDialog } from "./components/DeletePageDialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type SortField = "title" | "status" | "last_modified" | "views";
type SortDirection = "asc" | "desc";

const PAGE_SIZE_OPTIONS = [
  { value: "5", label: "5 per page" },
  { value: "10", label: "10 per page" },
  { value: "20", label: "20 per page" },
  { value: "50", label: "50 per page" },
  { value: "100", label: "100 per page" },
  { value: "all", label: "Show all" }
];

export default function Pages() {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("last_modified");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<string>("5");
  const [pageToDelete, setPageToDelete] = useState<number | null>(null);

  const { data: pages = [], isLoading } = useQuery({
    queryKey: ['pages', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('last_modified', { ascending: false });

      if (error) {
        console.error('Error fetching pages:', error);
        toast({
          title: "Error fetching pages",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data;
    },
    enabled: !!user,
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDeletePage = async () => {
    if (pageToDelete) {
      try {
        const { error } = await supabase
          .from('pages')
          .delete()
          .eq('id', pageToDelete);

        if (error) throw error;

        queryClient.invalidateQueries({ queryKey: ['pages'] });
        toast({
          title: "Page deleted",
          description: "The page has been successfully deleted.",
        });
        setPageToDelete(null);
      } catch (error: any) {
        console.error('Error deleting page:', error);
        toast({
          title: "Error deleting page",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const filteredAndSortedPages = pages
    .filter(page => 
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter === "all" || page.status === statusFilter)
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const modifier = sortDirection === "asc" ? 1 : -1;
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue) * modifier;
      }
      return ((aValue as number) - (bValue as number)) * modifier;
    });

  const itemsPerPage = pageSize === "all" ? filteredAndSortedPages.length : parseInt(pageSize);
  const totalPages = Math.ceil(filteredAndSortedPages.length / itemsPerPage);
  const paginatedPages = pageSize === "all" 
    ? filteredAndSortedPages 
    : filteredAndSortedPages.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in">
      <PagesHeader />
      
      <div className="flex justify-between items-center gap-4">
        <PagesFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />
        <Select
          value={pageSize}
          onValueChange={handlePageSizeChange}
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
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:text-foreground"
                onClick={() => handleSort("title")}
              >
                Title
                {sortField === "title" && (
                  sortDirection === "asc" ? <ArrowUp className="w-4 h-4 inline ml-2" /> : <ArrowDown className="w-4 h-4 inline ml-2" />
                )}
              </TableHead>
              <TableHead>URL</TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground"
                onClick={() => handleSort("status")}
              >
                Status
                {sortField === "status" && (
                  sortDirection === "asc" ? <ArrowUp className="w-4 h-4 inline ml-2" /> : <ArrowDown className="w-4 h-4 inline ml-2" />
                )}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground"
                onClick={() => handleSort("last_modified")}
              >
                Last Modified
                {sortField === "last_modified" && (
                  sortDirection === "asc" ? <ArrowUp className="w-4 h-4 inline ml-2" /> : <ArrowDown className="w-4 h-4 inline ml-2" />
                )}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground"
                onClick={() => handleSort("views")}
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
            {paginatedPages.map((page) => (
              <PageRow 
                key={page.id} 
                page={page} 
                onDeleteClick={setPageToDelete}
              />
            ))}
          </TableBody>
        </Table>
        
        {totalPages > 1 && pageSize !== "all" && (
          <div className="border-t p-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  >
                    <span>Previous</span>
                  </PaginationLink>
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  >
                    <span>Next</span>
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      <DeletePageDialog
        isOpen={pageToDelete !== null}
        onOpenChange={(open) => !open && setPageToDelete(null)}
        onConfirm={handleDeletePage}
      />
    </div>
  );
}
