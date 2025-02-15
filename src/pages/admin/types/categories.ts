
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  parentId?: number | null;
}

export interface PageWithCategory extends Page {
  categoryId?: number | null;
}
