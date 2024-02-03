import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Product } from '../shared/models/product';

import { Pagination } from '../shared/models/pagination';
import { Observable } from 'rxjs';

import { ProductBrand } from '../shared/models/ProductBrand';
import { ProductType } from '../shared/models/ProductType';
import { StoreParams } from '../shared/models/StoreParams';


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private baseUrl = 'http://localhost:5233/api/Products';

  constructor(private http: HttpClient) {}


  getProducts(params: StoreParams): Observable<Pagination<Product>> {
    let httpParams = new HttpParams()
      .set('sort', params.selectedSort)
     .set('skip', params.skip.toString())
      .set('take', params.take.toString());

    // Add brand and type parameters if they are provided  && productBrandId && productTypeId
    if (params.productBrandId !== 0) {
      httpParams = httpParams.set('ProductBrandId', params.productBrandId.toString());
    }

    if (params.productTypeId !== 0) {
      httpParams = httpParams.set('ProductTypeId', params.productTypeId.toString());
    }

    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }

    httpParams = httpParams.set('pageIndex', params.pageNumber);
    httpParams = httpParams.set('pageSize', params.pageSize);

    const url = `${this.baseUrl}`;

    return this.http.get<Pagination<Product>>(url, { params: httpParams });
  }
  getProduct(id:number){

    const url = `${this.baseUrl}/${id}`;
   
    return this.http.get<Product>(url);

  }
  filterProducts(brand: string| null, type: string | null){
      return[];
  }

  getBrands(){
    const url= this.baseUrl+ '/brands';
    return this.http.get<ProductBrand[]>(url);

  }
  getTypes(){
    const url= this.baseUrl+ '/types';
    return this.http.get<ProductType[]>(url);
  }

}


