
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AdminLayout } from "@/components/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Pages from "@/pages/admin/Pages";
import PageEditor from "@/pages/admin/PageEditor";
import Preview from "@/pages/Preview";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/preview/*" element={<Preview />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pages" element={<Pages />} />
          <Route path="pages/:id/edit" element={<PageEditor />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}
