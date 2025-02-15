
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { PageWithCategory } from "../types/categories";

type SortField = "title" | "status" | "lastModified" | "views";
type SortDirection = "asc" | "desc";

export function usePages() {
  const { toast } = useToast();
  const [pages, setPages] = useState<PageWithCategory[]>([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("lastModified");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<string>("5");
  const [pageToDelete, setPageToDelete] = useState<number | null>(null);

  useEffect(() => {
    const storedPages = localStorage.getItem('pages');
    const storedCategories = localStorage.getItem('categories');
    if (storedPages) {
      setPages(JSON.parse(storedPages));
    }
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  const handleCategoryChange = (pageId: number, categoryId: number | null) => {
    const updatedPages = pages.map(page =>
      page.id === pageId
        ? { ...page, categoryId }
        : page
    );
    setPages(updatedPages);
    localStorage.setItem('pages', JSON.stringify(updatedPages));
    
    toast({
      title: "Category updated",
      description: "The page category has been updated successfully."
    });
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDeletePage = () => {
    if (pageToDelete) {
      const updatedPages = pages.filter(page => page.id !== pageToDelete);
      setPages(updatedPages);
      localStorage.setItem('pages', JSON.stringify(updatedPages));
      toast({
        title: "Page deleted",
        description: "The page has been successfully deleted.",
      });
      setPageToDelete(null);
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

  return {
    pages: paginatedPages,
    categories,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortField,
    sortDirection,
    currentPage,
    setCurrentPage,
    pageSize,
    totalPages,
    pageToDelete,
    setPageToDelete,
    handleSort,
    handleCategoryChange,
    handleDeletePage,
    handlePageSizeChange,
  };
}
