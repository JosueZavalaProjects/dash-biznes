export type Product = {
  id?: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  inventory: number;
  dateAdded: string;
};

export enum InventoryModalStep {
  edit,
  delete,
  deleteConfirm,
  editConfirm,
}
