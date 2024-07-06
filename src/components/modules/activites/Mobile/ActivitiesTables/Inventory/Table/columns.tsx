import { EditOptions } from "@/components/modules/inventory/table/editOptions";
import { InventoryColumnsProps, Product } from "@/types/inventory";
import { ColumnDef } from "@tanstack/react-table";

export const InventoryMobileColumns = ({
  handleDeleteProduct,
  handleEditProduct,
}: InventoryColumnsProps): ColumnDef<Product>[] => {
  return [
    {
      accessorKey: "mobileInventory",
      header: "",
      cell: ({ row }) => {
        return (
          <div className="flex w-full justify-between text-xl px-2 text-gray-600">
            <div className="flex gap-2 items-center">
              <div className="flex items-center">
                <span className="p-6 bg-slate-400"></span>
              </div>
              <div className="flex flex-col text-left">
                <span>{row.original.name}</span>
                <span className="">{row.original.dateAdded.toString()}</span>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex flex-col text-right">
                {row.original.inventory} pzs
                {Boolean(row.original.inventory) && (
                  <span className="text-primary-green">En existencia</span>
                )}
                {!Boolean(row.original.inventory) && (
                  <span className="text-pastel-light-red">Sin existencia</span>
                )}
              </div>
              <div className="flex items-center">
                <EditOptions
                  handleDelete={handleDeleteProduct}
                  handleEdit={handleEditProduct}
                  id={row.original.id!}
                />
              </div>
            </div>
          </div>
        );
      },
    },
  ];
};
