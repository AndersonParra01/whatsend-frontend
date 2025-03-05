import { Branch_Office } from "./branch_office";
import { Message } from "./messages";
import { Status } from "./status";

export interface Customer {
  id: number;
  names: string;
  phone: string;
  email?: string;
  branch: Branch_Office
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  messages?: Message[];
}
