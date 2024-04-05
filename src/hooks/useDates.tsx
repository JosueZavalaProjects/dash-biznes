export const useDates = () => {
  const GetLastDate = (startDate: string) => {
    const splitedData = startDate.split("-");
    const year = splitedData[0];
    const month = splitedData[1];

    const days = _daysInMonth(+year, +month);
    return `${year}-${month}-${days}`;
  };

  const GetCurrentDate = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const month = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
    return `${currentYear}-${month}-01`;
  };

  const _daysInMonth = (year: number, month: number) =>
    new Date(year, month, 0).getDate();

  return { GetLastDate, GetCurrentDate };
};
