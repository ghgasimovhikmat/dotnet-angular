import { Product } from "./product";

export interface Pagination<T> {
  pageIndex: number;
  pageSize: number;
  totalItems: number;
  data: T[];
}

