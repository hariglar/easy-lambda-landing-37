
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead,
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Eye, FileEdit, Globe, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// This would typically come from an API
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
  }
];

export default function Pages() {
  const navigate = useNavigate();
  const [pages] = useState(mockPages);

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

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page) => (
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
                    <Button variant="ghost" size="icon">
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
      </div>
    </div>
  );
}
