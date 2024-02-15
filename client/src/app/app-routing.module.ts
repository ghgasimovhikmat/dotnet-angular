import { BasketModule } from './basket/basket.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  {path:'', component:HomeComponent,data:{breadcrumb:'Home'}},

  {path:'store', loadChildren:()=>import('./store/store.module').then(m=>m.StoreModule),data:{breadcrumb:'Store'}},
  {path:'basket', loadChildren:()=>import('./basket/basket.module').then(m=>m.BasketModule),data:{breadcrumb:'Basket'}},
  {path:'not-found', component:NotFoundComponent,data:{breadcrumb:'Not Found'}},
  {path:'server-error', component:ServerErrorComponent,data:{breadcrumb:'Server'}},
  {path:'**', redirectTo:'',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
