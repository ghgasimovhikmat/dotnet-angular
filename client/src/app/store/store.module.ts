import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { ProductItemsComponent } from './product-items/product-items.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PaginationComponent, PaginationModule } from 'ngx-bootstrap/pagination';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule } from '@angular/router';
import { StoreRoutingModule } from './store-routing.module';


@NgModule({
  declarations:
    [
      StoreComponent,
      ProductItemsComponent,
      ProductDetailsComponent,
    ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    StoreRoutingModule
  ],
  /*exports: [
    StoreComponent,
    SharedModule,
    PaginationComponent
  ]*/
})
export class StoreModule { }
