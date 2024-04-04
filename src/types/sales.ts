export type Sale = {
  id: string;
  ticketNumber: string;
  date: string | Date;
  total: number;
  method: string;
};

export enum SalesModalStep {
  delete,
  deleteConfirm,
}
