
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PagesHeader } from "./components/PagesHeader";
import { PagesFilter } from "./components/PagesFilter";
import { PageTable } from "./components/PageTable";
import { PagesPagination } from "./components/PagesPagination";
import { DeletePageDialog } from "./components/DeletePageDialog";
import { usePages } from "./hooks/usePages";
import { PAGE_SIZE_OPTIONS } from "./types/pages";

export default function Pages() {
  const {
    pages,
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
  } = usePages();

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
        <PageTable
          pages={pages}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onDeleteClick={setPageToDelete}
        />
        
        {totalPages > 1 && pageSize !== "all" && (
          <PagesPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
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
