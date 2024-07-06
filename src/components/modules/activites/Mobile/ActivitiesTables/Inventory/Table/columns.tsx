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
          <div className="flex w-full justify-between text-xl px-4 text-gray-600">
            <div className="flex flex-col text-left">
              <span>{row.original.name}</span>
              <span className="">{row.original.dateAdded.toString()}</span>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col text-right">
                {/* <GreenLabel text={formatCurrency(row.original.total)} /> */}

                <span className="text-secondary-gray">
                  {/* {row.original.method} */}
                </span>
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
