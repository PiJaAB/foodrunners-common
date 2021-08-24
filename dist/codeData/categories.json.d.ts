export interface Category {
  name: string;
  children?: Record<string, Category>;
}
declare const categories: Record<string, Category>;
export default categories;
