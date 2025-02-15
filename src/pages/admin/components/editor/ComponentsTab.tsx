
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layout, Layers, Type } from "lucide-react";

export function ComponentsTab() {
  return (
    <Card className="p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Button variant="outline" className="h-24 flex flex-col gap-2">
          <Layout className="w-6 h-6" />
          Hero Section
        </Button>
        <Button variant="outline" className="h-24 flex flex-col gap-2">
          <Layers className="w-6 h-6" />
          Features Grid
        </Button>
        <Button variant="outline" className="h-24 flex flex-col gap-2">
          <Type className="w-6 h-6" />
          Testimonials
        </Button>
      </div>
    </Card>
  );
}
