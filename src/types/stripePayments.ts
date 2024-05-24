import { Timestamp } from "firebase/firestore";

export type CancelPeriod = {
  cancelAtPeriodEnd: boolean;
  cancelAt?: Timestamp;
};
