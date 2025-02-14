import { useState } from "react";
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
import { ArrowUp, ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PagesHeader } from "./components/PagesHeader";
import { PagesFilter } from "./components/PagesFilter";
import { PageRow } from "./components/PageRow";
import { DeletePageDialog } from "./components/DeletePageDialog";

const mockPages = [
  {
    id: 1,
    title: "Homepage",
    status: "published",
    url: "/homepage",
    lastModified: "2024-02-20",
    views: 1234
  },
  {
    id: 2,
    title: "Product Launch",
    status: "draft",
    url: "/product-launch",
    lastModified: "2024-02-19",
    views: 0
  },
  {
    id: 3,
    title: "Contact Us",
    status: "published",
    url: "/contact",
    lastModified: "2024-02-18",
    views: 567
  },
  {
    id: 4,
    title: "About Us",
    status: "published",
    url: "/about",
    lastModified: "2024-02-17",
    views: 890
  },
  {
    id: 5,
    title: "Services",
    status: "draft",
    url: "/services",
    lastModified: "2024-02-16",
    views: 123
  },
  {
    id: 6,
    title: "Blog",
    status: "published",
    url: "/blog",
    lastModified: "2024-02-15",
    views: 2341
  }
];

type SortField = "title" | "status" | "lastModified" | "views";
type SortDirection = "asc" | "desc";

const ITEMS_PER_PAGE = 5;

export default function Pages() {
  const { toast } = useToast();
  const [pages, setPages] = useState(mockPages);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("lastModified");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageToDelete, setPageToDelete] = useState<number | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
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

  const totalPages = Math.ceil(filteredAndSortedPages.length / ITEMS_PER_PAGE);
  const paginatedPages = filteredAndSortedPages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDeletePage = () => {
    if (pageToDelete) {
      setPages(prevPages => prevPages.filter(page => page.id !== pageToDelete));
      toast({
        title: "Page deleted",
        description: "The page has been successfully deleted.",
      });
      setPageToDelete(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      <PagesHeader />
      
      <PagesFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

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
                onClick={() => handleSort("lastModified")}
              >
                Last Modified
                {sortField === "lastModified" && (
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
        
        {totalPages > 1 && (
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
