import { Product } from "./product";

export class StoreParams {
  sort: string=  'NameAsc';
  skip: number=0;
  take: number=10;
  productBrandId:  number = 0;
  productTypeId:  number = 0;
  selectedSort = 'NameAsc'; // Default sorting by name ascending
  search: string = '';
  originalProducts: Product[] = []; // Store the original list of products
  selectedBrandId:number = 0;
  selectedTypeId:number = 0;
  paginationTotalItems: number = 0; // Total items for pagination
  pageSize: number = 10; // Number of items per page
  pageNumber: number = 1; // Current page
}


