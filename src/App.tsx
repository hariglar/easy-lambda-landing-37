
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AdminLayout } from "@/components/AdminLayout";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/admin/Dashboard";
import Pages from "@/pages/admin/Pages";
import Categories from "@/pages/admin/Categories";
import PageEditor from "@/pages/admin/PageEditor";
import Preview from "@/pages/Preview";

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminLayout><Outlet /></AdminLayout>}>
            <Route index element={<Dashboard />} />
            <Route path="pages" element={<Pages />} />
            <Route path="categories" element={<Categories />} />
            <Route path="pages/new" element={<PageEditor />} />
            <Route path="preview" element={<Preview />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}
