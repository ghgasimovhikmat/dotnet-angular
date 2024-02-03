// store.component.ts
import { Component, Input, OnInit ,ChangeDetectorRef} from '@angular/core';
import { StoreService } from './store.service';
import { Product } from '../shared/models/product';

import { ProductBrand } from '../shared/models/ProductBrand';
import {  ProductType } from "../shared/models/ProductType";
import { StoreParams } from '../shared/models/StoreParams';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  @Input() title: string = '';
  products: Product[] = [];
  brands: ProductBrand [] = [];
  types:  ProductType [] = [];
  params:StoreParams=new StoreParams();
  totalcount=0;

  constructor(private storeService: StoreService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(){

    this.fetchProducts();
    this.getBrands();
    this.getTypes();

  }


  onSortChange(){
    //this.params.sort = this.params.selectedSort;
    this.filterProducts();
  }
 // Handle brand selection
 selectBrand(brandId: number) {
  this.params.productBrandId = brandId;

  this.filterProducts();
}

// Handle type selection
selectType(typeId: number) {
  this.params.productTypeId = typeId;

  this.filterProducts();
}

getBrands(){
  this.storeService.getBrands().subscribe( {
    // Add an "All" option at the beginning of the brands array
    next:response=>this.brands = [{ id: 0, name: 'All' }, ...response],
    error:error=>console.log(error)
  });
}
getTypes(){
  this.storeService.getTypes().subscribe({
    next:response=>this.types=[{id:0,name:'All'},...response],
    error:error=>console.log(error)
  })
}



fetchProducts() {

  this.storeService.getProducts(this.params).subscribe({
    next: (response) => {
      this.products = response.data;
      this.params.originalProducts = [...this.products];
      this.params.pageNumber=response.pageIndex;
      this.params.pageSize=response.pageSize;
      this.totalcount=response.totalItems;

      //console.log( response.data);

    },
    error: (error) => console.error('Error fetching products:', error)
  });
}

searchProduct(){
  this.products = this.params.originalProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(this.params.search)
  );
  this.totalcount=this.products.length;
}


filterProducts(){
  this.fetchProducts();
}
resetFilter(){
  this.params.search='';
  this.params.pageNumber=1;
  this.fetchProducts();
}



onPageChanged(event: any) {

  //console.log(event);
  this.params.pageNumber= event;

  // Fetch the new page of products
  this.fetchProducts();
}

}




