import { ProductBrand } from "./ProductBrand";
import { ProductType } from "./ProductType";



export interface Product {
  id :number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  productBrand:string;
  productType:string;
  //productBrand:ProductBrand;
  //productType: ProductType;
}
