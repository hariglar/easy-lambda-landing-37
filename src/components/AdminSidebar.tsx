
import { 
  LayoutDashboard, 
  FileEdit, 
  Image, 
  Settings, 
  Eye,
  PlusCircle 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin"
  },
  {
    title: "Pages",
    icon: FileEdit,
    path: "/admin/pages"
  },
  {
    title: "Media",
    icon: Image,
    path: "/admin/media"
  },
  {
    title: "Preview",
    icon: Eye,
    path: "/admin/preview"
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/admin/settings"
  }
];

export function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-6">
          <button 
            onClick={() => navigate('/admin/pages/new')}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <PlusCircle size={20} />
            <span>New Page</span>
          </button>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    onClick={() => navigate(item.path)}
                  >
                    <button className="w-full">
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
