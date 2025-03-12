import { Branch_Office } from "./branch_office";
import { Status } from "./status";

export interface Message {
  id: number;
  message: string;
  createdAt: Date;
  status: string;
  intervale: number;
  contactName: "Jane Smith";
  phoneNumber: "+1987654321";
  timestamp: Date;
  profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  created_at: Date;
  updated_at: Date;
  content: "¡Aprovecha nuestra promoción especial! 20% de descuento en todos nuestros productos hasta fin de mes.",
  promotion: true;
  branch?: Branch_Office;
}


