import { Message } from "./messages";

export interface Paginator {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

export interface MessageResponse {
  data: Message[];
  total: number;
  page: number;
  rows: number;
}
