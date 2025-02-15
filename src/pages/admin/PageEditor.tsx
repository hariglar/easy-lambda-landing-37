
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditorHeader } from "./components/editor/EditorHeader";
import { EditorTabs } from "./components/editor/EditorTabs";
import { DesignTab } from "./components/editor/DesignTab";
import { ContentTab } from "./components/editor/tabs/ContentTab";
import { MediaTab } from "./components/editor/tabs/MediaTab";
import { CodeTab } from "./components/editor/tabs/CodeTab";
import { ComponentsTab } from "./components/editor/tabs/ComponentsTab";
import { SettingsTab } from "./components/editor/tabs/SettingsTab";
import { templates } from "./data/mockData";
import { useEditor } from "./hooks/useEditor";

export default function PageEditor() {
  const {
    currentTab,
    setCurrentTab,
    selectedTemplate,
    setSelectedTemplate,
    metaExpanded,
    setMetaExpanded,
    lastSaved,
    content,
    isDirty,
    setIsDirty,
    templateId,
    pageTitle,
    setPageTitle,
    pageUrl,
    setPageUrl,
    handleContentChange,
    handleSave
  } = useEditor();

  return (
    <div className="space-y-8 animate-in fade-in">
      <EditorHeader 
        lastSaved={lastSaved}
        onSave={handleSave}
        isDirty={isDirty}
        pageUrl={pageUrl}
        pageTitle={pageTitle}
        setPageUrl={setPageUrl}
      />

      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Page Title</Label>
            <Input
              value={pageTitle}
              onChange={(e) => {
                setPageTitle(e.target.value);
                setIsDirty(true);
              }}
              placeholder="Enter page title..."
            />
          </div>
          <div className="space-y-2">
            <Label>Page URL</Label>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">/</span>
              <Input
                value={pageUrl.startsWith('/') ? pageUrl.slice(1) : pageUrl}
                onChange={(e) => {
                  setPageUrl('/' + e.target.value.replace(/^\/*/, ''));
                  setIsDirty(true);
                }}
                placeholder="page-url"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              The URL should be unique and contain only letters, numbers, and hyphens
            </p>
          </div>
        </div>
      </Card>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
        <EditorTabs />

        <TabsContent value="design" className="space-y-6">
          <DesignTab 
            templateId={templateId}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            metaExpanded={metaExpanded}
            setMetaExpanded={setMetaExpanded}
            templates={templates}
            content={content}
            handleContentChange={handleContentChange}
          />
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <ContentTab 
            content={content}
            handleContentChange={handleContentChange}
          />
        </TabsContent>

        <TabsContent value="media" className="min-h-[300px] space-y-6">
          <MediaTab />
        </TabsContent>

        <TabsContent value="code" className="min-h-[300px] space-y-6">
          <CodeTab />
        </TabsContent>

        <TabsContent value="components" className="space-y-6">
          <ComponentsTab />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
