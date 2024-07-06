export type Product = {
  id?: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  inventory: number;
  dateAdded: string;
  image?: string;
};

export enum InventoryModalStep {
  edit,
  delete,
  deleteConfirm,
  editConfirm,
}

export type InventoryColumnsProps = {
  handleDeleteProduct: (id: string) => void;
  handleEditProduct: (id: string) => void;
};