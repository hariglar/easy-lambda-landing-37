import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead,
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Eye, FileEdit, Globe, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data - expanded for pagination example
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
  const navigate = useNavigate();
  const [pages, setPages] = useState(mockPages);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("lastModified");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Pages</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage your landing pages.
          </p>
        </div>
        <Button onClick={() => navigate("/admin/pages/new")} size="lg">
          Create Page
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search pages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            onClick={() => setStatusFilter("all")}
          >
            All
          </Button>
          <Button
            variant={statusFilter === "published" ? "default" : "outline"}
            onClick={() => setStatusFilter("published")}
          >
            Published
          </Button>
          <Button
            variant={statusFilter === "draft" ? "default" : "outline"}
            onClick={() => setStatusFilter("draft")}
          >
            Drafts
          </Button>
        </div>
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
              <TableRow key={page.id} className="group">
                <TableCell className="font-medium">{page.title}</TableCell>
                <TableCell>{page.url}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    page.status === 'published' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {page.status === 'published' ? <Globe className="w-3 h-3" /> : null}
                    {page.status}
                  </span>
                </TableCell>
                <TableCell>{page.lastModified}</TableCell>
                <TableCell>{page.views.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => navigate(`/admin/pages/${page.id}/edit`)}
                    >
                      <FileEdit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {totalPages > 1 && (
          <div className="border-t p-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  />
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
                  <PaginationNext 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
