import { Message } from "./messages";

export interface Customer {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  messages?: Message[];
}
