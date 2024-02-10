import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginationHeaderComponent } from './components/pagination-header/pagination-header.component';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
@NgModule({
  declarations: [PaginationHeaderComponent,   PaginationComponent],
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  exports:[
    PaginationModule,
    PaginationHeaderComponent,
    PaginationComponent,
    FormsModule,
    CarouselModule
  ]
})
export class SharedModule { }
