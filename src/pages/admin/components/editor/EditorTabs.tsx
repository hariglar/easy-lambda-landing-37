
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Layout, Type, Image as ImageIcon, Layers, Settings } from "lucide-react";

export function EditorTabs() {
  return (
    <TabsList className="grid w-full grid-cols-6 lg:w-[600px]">
      <TabsTrigger value="design">
        <Layout className="w-4 h-4 mr-2" />
        Design
      </TabsTrigger>
      <TabsTrigger value="content">
        <Type className="w-4 h-4 mr-2" />
        Content
      </TabsTrigger>
      <TabsTrigger value="media">
        <ImageIcon className="w-4 h-4 mr-2" />
        Media
      </TabsTrigger>
      <TabsTrigger value="code">
        <Code className="w-4 h-4 mr-2" />
        Code
      </TabsTrigger>
      <TabsTrigger value="components">
        <Layers className="w-4 h-4 mr-2" />
        Components
      </TabsTrigger>
      <TabsTrigger value="settings">
        <Settings className="w-4 h-4 mr-2" />
        Settings
      </TabsTrigger>
    </TabsList>
  );
}
