import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';
import { BasketService } from './basket/basket.service';
import { Basket } from './shared/models/basket';
import { isPlatformBrowser } from '@angular/common';
import { AccountService } from './account/account.service';
// Define an interface for a product


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Sport Center';

  constructor(
    private basketService: BasketService,
    @Inject(PLATFORM_ID) private platformId: Object  // Inject PLATFORM_ID
    , private accountService: AccountService) { }

  ngOnInit(): void {

    this.loadBasket();
    this.loadUser();

  }
  loadBasket() {
    if (isPlatformBrowser(this.platformId)) {
      const basketId = localStorage.getItem('basket_id');
      if (basketId) {
        this.basketService.getBasket(basketId).subscribe({
          next: basket => {
            console.log('Basket fetched:', basket);
          },
          error: error => {
            console.error('Error fetching basket:', error);
          }
        });
      }
    }
  }

  loadUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.accountService.loadUser(token).subscribe({
        next: user => {
          console.log('User loaded:', user);
        },
        error: error => {
          console.error('Error loading user:', error);
        }
      });
    }
  }
}

