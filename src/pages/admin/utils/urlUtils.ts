
export const isUrlUnique = (url: string, currentPageId: number | null) => {
  const storedPages = JSON.parse(localStorage.getItem('pages') || '[]');
  const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
  
  return !storedPages.some((page: any) => {
    if (currentPageId && page.id === currentPageId) {
      return false;
    }
    return page.url === normalizedUrl;
  });
};
