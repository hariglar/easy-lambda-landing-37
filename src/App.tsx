import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AdminLayout } from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Pages from "./pages/admin/Pages";
import PageEditor from "./pages/admin/PageEditor";
import Preview from "./pages/Preview";
import NotFound from "./pages/NotFound";
import EcommerceLanding from "./pages/admin/templates/EcommerceLanding";

const queryClient = new QueryClient();

const PublishedPage = () => {
  const path = window.location.pathname;
  const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
  const page = storedPages.find((p: any) => p.url === path && p.status === 'published');
  
  if (!page) {
    return <NotFound />;
  }
  
  return (
    <EcommerceLanding 
      content={page.content} 
      onContentChange={() => {}} 
      isEditing={false} 
    />
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/pages" element={<AdminLayout><Pages /></AdminLayout>} />
          <Route path="/admin/pages/new" element={<AdminLayout><PageEditor /></AdminLayout>} />
          <Route path="/admin/pages/:id/edit" element={<AdminLayout><PageEditor /></AdminLayout>} />
          <Route path="/preview/*" element={<Preview />} />
          <Route path="/admin/*" element={<AdminLayout><NotFound /></AdminLayout>} />
          <Route path="/*" element={<PublishedPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
