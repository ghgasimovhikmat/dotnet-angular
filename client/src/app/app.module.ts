import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';

import { StoreModule } from './store/store.module';
import { HomeModule } from './home/home.module';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    //StoreModule,
    HomeModule
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true, // Set multi to true to allow multiple interceptors
      },

    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
