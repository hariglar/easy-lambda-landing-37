import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Eye, 
  FileEdit, 
  BarChart3, 
  ArrowUp, 
  ArrowDown, 
  PlusCircle,
  Users,
  Clock,
  Mouse,
  Globe,
  Smartphone,
  Laptop,
  ShoppingCart,
  Target,
  Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data - would typically come from an API
const stats = [
  {
    id: 1,
    label: "Total Pages",
    value: "12",
    change: "+20%",
    trend: "up",
    icon: Globe
  },
  {
    id: 2,
    label: "Total Visitors",
    value: "8,451",
    change: "+12%",
    trend: "up",
    icon: Users
  },
  {
    id: 3,
    label: "Avg. Time on Site",
    value: "2:30",
    change: "-5%",
    trend: "down",
    icon: Clock
  },
  {
    id: 4,
    label: "Conversion Rate",
    value: "3.2%",
    change: "+8%",
    trend: "up",
    icon: Mouse
  }
];

const deviceStats = {
  mobile: 58,
  desktop: 32,
  tablet: 10
};

const conversionMetrics = [
  {
    label: "Homepage",
    rate: 4.2,
    progress: 84
  },
  {
    label: "Product Page",
    rate: 3.8,
    progress: 76
  },
  {
    label: "Checkout",
    rate: 2.9,
    progress: 58
  }
];

const recentPages = [
  {
    id: 1,
    title: "Homepage",
    views: 1234,
    lastModified: "2 hours ago",
    status: "published"
  },
  {
    id: 2,
    title: "Product Launch",
    views: 567,
    lastModified: "5 hours ago",
    status: "draft"
  },
  {
    id: 3,
    title: "Contact Us",
    views: 89,
    lastModified: "1 day ago",
    status: "published"
  }
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Welcome back!</h1>
          <p className="text-muted-foreground mt-2">
            Here's what's happening with your landing pages today.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.id} className="p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-full">
                <stat.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-3xl font-bold">{stat.value}</span>
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

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Device Distribution</h2>
            <p className="text-sm text-muted-foreground mt-1">
              How users are accessing your pages
            </p>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Mobile</span>
                </div>
                <span className="text-sm font-bold">{deviceStats.mobile}%</span>
              </div>
              <Progress value={deviceStats.mobile} className="h-2" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">Desktop</span>
                </div>
                <span className="text-sm font-bold">{deviceStats.desktop}%</span>
              </div>
              <Progress value={deviceStats.desktop} className="h-2" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Tablet</span>
                </div>
                <span className="text-sm font-bold">{deviceStats.tablet}%</span>
              </div>
              <Progress value={deviceStats.tablet} className="h-2" />
            </div>
          </div>
        </Card>

        <Card className="shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Page Performance</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Conversion rates by page
            </p>
          </div>
          <div className="p-6 space-y-6">
            {conversionMetrics.map((metric, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{metric.label}</span>
                  </div>
                  <span className="text-sm font-bold">{metric.rate}%</span>
                </div>
                <Progress value={metric.progress} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Pages</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Your most recently modified pages and their performance.
          </p>
        </div>
        <div className="divide-y">
          {recentPages.map((page) => (
            <div 
              key={page.id} 
              className="p-6 flex items-center justify-between group hover:bg-muted/50 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{page.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    page.status === 'published' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {page.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Last modified {page.lastModified} • {page.views.toLocaleString()} views
                </p>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="hover:bg-background">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-background"
                  onClick={() => navigate(`/admin/pages/${page.id}/edit`)}
                >
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
