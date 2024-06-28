import { ColumnDef } from "@tanstack/react-table";

export type ProductAlert = {
  id: string;
  name: string;
  inventory: number;
};

export const ProductAlertColumns = (): ColumnDef<ProductAlert>[] => {
  return [
    {
      accessorKey: "name",
      header: "Existencia con Poca Cantidad",
      cell: ({ row }) => {
        /* console.log(row.getAllCells()); */

        return (
          <div className="flex">
            <div className="grid gap-2 w-2/3">
              <div>{row.getValue("name")}</div>
              <div>Candidad Restante: {row.original.inventory}</div>
            </div>
            <div className="grid justify-items-center items-center w-2/3">
              <p>
                <span className="px-2 py-1.5 rounded-2xl font-semibold text-[#AA3028] bg-[#FEEC] cursor-pointer">
                  Reordenar
                </span>
              </p>
            </div>
          </div>
        );
      },
    },
  ];
};
