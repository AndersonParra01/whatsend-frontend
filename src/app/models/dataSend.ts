import { Branch_Office } from "./branch_office";
import { Customer } from "./customers";

export interface DataSend {
  message: string;
  intervale: number;
  branch: Branch_Office,
  contacts: Customer[],
}
