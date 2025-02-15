
import { usePages } from "./hooks/usePages";
import { PagesHeader } from "./components/PagesHeader";
import { PagesFilter } from "./components/PagesFilter";
import { PagesTable } from "./components/PagesTable";
import { PageSizeSelector } from "./components/PageSizeSelector";
import { DeletePageDialog } from "./components/DeletePageDialog";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

export default function Pages() {
  const {
    pages,
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
  } = usePages();

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
        <PageSizeSelector
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>

      <div className="rounded-lg border bg-card">
        <PagesTable
          pages={pages}
          categories={categories}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onDeleteClick={setPageToDelete}
          onCategoryChange={handleCategoryChange}
        />
        
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
