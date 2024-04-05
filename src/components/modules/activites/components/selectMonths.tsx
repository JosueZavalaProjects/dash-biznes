import { MONTH_LABELS, OPTIONS_LENGTH } from "@/constants/activities";

type SelectMonthsProps = {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
export const SelectMonths = ({ handleChange }: SelectMonthsProps) => {
  const createMonthOptions = () => {
    const currentDate = new Date();
    const firstMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    let lastMonth;
    let options = [];

    // Todos los meses del mismo año
    if (firstMonth >= OPTIONS_LENGTH) {
      lastMonth = firstMonth - OPTIONS_LENGTH;
      for (let i = firstMonth; i > lastMonth; i--) {
        const month = i >= 10 ? i : `0${i}`;
        const label = i === firstMonth ? "Mes actual" : MONTH_LABELS[i - 1];
        const object = {
          value: `${currentYear}-${month}-01`,
          label: label,
        };
        options.push(object);
      }
    }

    // Meses tambien del año anterior
    if (firstMonth < OPTIONS_LENGTH) {
      lastMonth = firstMonth - OPTIONS_LENGTH; //last month ALWAYS negative

      for (let i = firstMonth; i > 0; i--) {
        const month = i >= 10 ? i : `0${i}`;
        const label = i === firstMonth ? "Mes actual" : MONTH_LABELS[i - 1];
        const object = {
          value: `${currentYear}-${month}-01`,
          label: label,
        };
        options.push(object);
      }
      for (let i = 12; i > 12 + lastMonth; i--) {
        const month = i >= 10 ? i : `0${i}`;
        const object = {
          value: `${currentYear - 1}-${month}-01`,
          label: `${MONTH_LABELS[i - 1]} ${currentYear - 1}`,
        };
        options.push(object);
      }
    }
    return options;
    /** Ejemplo 
     * Current = 4 (abril)
     * Marzo
     * Febrero
     * Enero
     * Dec - 2003
     * Nov - 2003
     * Oct - 2003
     */
  };

  return (
    <div className="flex pt-4 w-full justify-end">
      <div className="w-40">
        <select
          name="selectedFruit"
          onChange={(e) => {
            handleChange(e);
          }}
          className="text-gray-500 p-2 w-full rounded-3xl border border-white bg-gray-100 focus:outline-none"
        >
          {createMonthOptions().map((element) => {
            return (
              <option value={element.value} key={element.value}>
                {element.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
