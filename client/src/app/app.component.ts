import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';

// Define an interface for a product


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'Sport Center';
  /*products: Product[] = [];
  pagination: Pagination |undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Pagination>('http://localhost:5233/api/Products?sort=NameAsc&skip=0&take=10')
      .subscribe({
        next: (data) => {
          this.pagination=data;
        // console.log(this.pagination);
          this.products = data.data;
         // console.log(data.data);
        },
        error: (error) => {
          console.error('Error fetching data', error);
        }
      });
  }*/
  ngOnInit(): void {}
}
