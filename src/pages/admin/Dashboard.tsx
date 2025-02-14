
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, FileEdit, BarChart3, ArrowUp, ArrowDown, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data - would typically come from an API
const stats = [
  {
    id: 1,
    label: "Total Pages",
    value: "12",
    change: "+20%",
    trend: "up"
  },
  {
    id: 2,
    label: "Total Views",
    value: "8,451",
    change: "+12%",
    trend: "up"
  },
  {
    id: 3,
    label: "Avg. Time on Page",
    value: "2:30",
    change: "-5%",
    trend: "down"
  },
  {
    id: 4,
    label: "Conversion Rate",
    value: "3.2%",
    change: "+8%",
    trend: "up"
  }
];

const recentPages = [
  {
    id: 1,
    title: "Homepage",
    views: 1234,
    lastModified: "2 hours ago"
  },
  {
    id: 2,
    title: "Product Launch",
    views: 567,
    lastModified: "5 hours ago"
  },
  {
    id: 3,
    title: "Contact Us",
    views: 89,
    lastModified: "1 day ago"
  }
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here's an overview of your landing pages.
          </p>
        </div>
        <Button onClick={() => navigate("/admin/pages/new")}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Create New Page
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.id} className="p-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className={`flex items-center text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUp className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDown className="w-4 h-4 mr-1" />
                )}
                {stat.change}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Pages</h2>
        </div>
        <div className="divide-y">
          {recentPages.map((page) => (
            <div key={page.id} className="p-6 flex items-center justify-between group">
              <div>
                <h3 className="font-medium">{page.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Last modified {page.lastModified} • {page.views.toLocaleString()} views
                </p>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/pages/${page.id}/edit`)}>
                  <FileEdit className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
