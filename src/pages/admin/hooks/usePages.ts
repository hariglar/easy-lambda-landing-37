
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Page, SortDirection, SortField } from "../types/pages";
import { useAuth } from "@/hooks/useAuth";

export function usePages() {
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

  return {
    pages: paginatedPages,
    isLoading,
    searchQuery,
    setSearchQuery,
    sortField,
    sortDirection,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    pageSize,
    totalPages,
    pageToDelete,
    setPageToDelete,
    handleSort,
    handleDeletePage,
    handlePageSizeChange,
  };
}
