import { Customer } from "./customers";
import { Message } from "./messages";

export interface Delivery {
  id?: number;
  message: Message;
  client: Customer;
  sent_at: Date;
  status: string;
}
