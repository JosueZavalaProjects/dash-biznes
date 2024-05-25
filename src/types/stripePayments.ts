import { Timestamp } from "firebase/firestore";

export type Status = "active" | "noActive" | "trialing";

export type CancelPeriod = {
  cancelAtPeriodEnd: boolean;
  cancelAt?: Timestamp;
  status?: Status;
  currentPeriodEnd?: Timestamp;
};

export const STATUS_LABELS: { [Properties in keyof Status as Status]: string } =
  {
    active: "Premium",
    noActive: "No activa",
    trialing: "Prueba",
  };
