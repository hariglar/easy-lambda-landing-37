
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "./components/ui/toaster";
import { Toaster as SonnerToaster } from "./components/ui/sonner";
import { AdminLayout } from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Pages from "./pages/admin/Pages";
import Categories from "./pages/admin/Categories";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PageEditor from "./pages/admin/PageEditor";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="pages" element={<Pages />} />
            <Route path="pages/new" element={<PageEditor />} />
            <Route path="pages/edit/:pageId" element={<PageEditor />} />
            <Route path="categories" element={<Categories />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <SonnerToaster />
      </ThemeProvider>
    </BrowserRouter>
  );
}
