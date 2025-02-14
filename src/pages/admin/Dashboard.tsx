
import { Card } from "@/components/ui/card";
import { FileEdit, Eye, Globe } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Pages",
      value: "12",
      icon: FileEdit,
      change: "+2 this week"
    },
    {
      title: "Page Views",
      value: "2.4k",
      icon: Eye,
      change: "+15% vs last week"
    },
    {
      title: "Published",
      value: "8",
      icon: Globe,
      change: "4 drafts"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to your landing page builder dashboard.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6 scale-in">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary rounded-full">
                <stat.icon size={24} className="text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground mt-1">{stat.change}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
