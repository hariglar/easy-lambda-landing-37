
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  parentId?: number | null;
}

export interface PageWithCategory {
  id: number;
  title: string;
  status: string;
  url: string;
  lastModified: string;
  views: number;
  content: any;
  categoryId?: number | null;
}
