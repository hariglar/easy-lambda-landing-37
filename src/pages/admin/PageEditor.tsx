
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { EditorHeader } from "./components/editor/EditorHeader";
import { EditorTabs } from "./components/editor/EditorTabs";
import { DesignTab } from "./components/editor/DesignTab";
import { ContentTab } from "./components/editor/ContentTab";
import { MediaTab } from "./components/editor/MediaTab";
import { CodeTab } from "./components/editor/CodeTab";
import { ComponentsTab } from "./components/editor/ComponentsTab";
import { SettingsTab } from "./components/editor/SettingsTab";
import { PageMetadataForm } from "./components/editor/PageMetadataForm";
import { templates } from "./data/mockData";
import { useContent } from "./hooks/useContent";

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
    categoryId,
    setCategoryId,
    handleContentChange,
    handleSave
  } = useContent(null);

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

      <PageMetadataForm
        pageTitle={pageTitle}
        setPageTitle={setPageTitle}
        pageUrl={pageUrl}
        setPageUrl={setPageUrl}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        setIsDirty={setIsDirty}
      />

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
