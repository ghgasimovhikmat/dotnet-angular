import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { StoreComponent } from './store.component';


const routes: Routes = [
  {path:'', component:StoreComponent},
  {path:':id', component:ProductDetailsComponent},

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class StoreRoutingModule { }
