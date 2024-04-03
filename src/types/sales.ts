export type Sale = {
  id: string;
  ticketNumber: string;
  date: string;
  total: number;
  method: string;
};

export enum SalesModalStep {
  delete,
  deleteConfirm,
}
