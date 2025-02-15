
import { Dispatch, SetStateAction } from "react";

export interface EditorState {
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
  selectedTemplate: number | null;
  setSelectedTemplate: Dispatch<SetStateAction<number | null>>;
  metaExpanded: boolean;
  setMetaExpanded: Dispatch<SetStateAction<boolean>>;
  lastSaved: Date | null;
  content: TemplateContent;
  isDirty: boolean;
  setIsDirty: Dispatch<SetStateAction<boolean>>;
  templateId: string | null;
  pageTitle: string;
  setPageTitle: (title: string) => void;
  pageUrl: string;
  setPageUrl: (url: string) => void;
  categoryId: number | null;
  setCategoryId: (id: number | null) => void;
  handleContentChange: (section: keyof TemplateContent, value: any, index?: number, field?: string) => void;
  handleSave: () => Promise<void>;
}
