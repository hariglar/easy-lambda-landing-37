
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AdminLayout } from "./components/AdminLayout";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import Dashboard from "./pages/admin/Dashboard";
import Pages from "./pages/admin/Pages";
import PageEditor from "./pages/admin/PageEditor";
import Preview from "./pages/Preview";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import EcommerceLanding from "./pages/admin/templates/EcommerceLanding";
import { supabase } from "./integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { TemplateContent } from "./pages/admin/types/editor";
import { Database } from "./integrations/supabase/types";

const queryClient = new QueryClient();

const ProtectedRoute = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <Outlet />;
};

const PublishedPage = () => {
  const path = window.location.pathname;
  const { data: page, isLoading } = useQuery({
    queryKey: ['published-page', path],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('url', path)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!page) {
    return <NotFound />;
  }

  // Type assertion to ensure content is treated as TemplateContent
  const content = page.content as unknown as TemplateContent;

  return (
    <EcommerceLanding 
      content={content} 
      onContentChange={() => {}} 
      isEditing={false} 
    />
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Navigate to="/admin" replace />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
              <Route path="/admin/pages" element={<AdminLayout><Pages /></AdminLayout>} />
              <Route path="/admin/pages/new" element={<AdminLayout><PageEditor /></AdminLayout>} />
              <Route path="/admin/pages/:id/edit" element={<AdminLayout><PageEditor /></AdminLayout>} />
              <Route path="/preview/*" element={<Preview />} />
              <Route path="/admin/*" element={<AdminLayout><NotFound /></AdminLayout>} />
            </Route>
            
            <Route path="/*" element={<PublishedPage />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
