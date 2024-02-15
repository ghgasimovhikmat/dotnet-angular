import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Basket, BasketItem } from '../shared/models/basket';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basketSubject: BehaviorSubject<Basket | null> = new BehaviorSubject<Basket | null>(null);
  basketSubject$=this.basketSubject.asObservable();
  private readonly baseUrl = 'http://localhost:5233/api/Basket';

  constructor(private http: HttpClient) { }

  getBasket(basketId: string): Observable<Basket> {
    return this.http.get<Basket>(`${this.baseUrl}/${basketId}`).pipe(
      tap(basket => this.basketSubject.next(basket)),
      catchError(error => {
        console.error('Error fetching basket:', error);
        throw error;
      })
    );
  }

  setBasket(basket:Basket): Observable<Basket> {
    return this.http.post<Basket>(`${this.baseUrl}`, basket).pipe(
      tap(updatedBasket => this.basketSubject.next(updatedBasket)),
      catchError(error => {
        console.error('Error updating basket:', error);
        throw error;
      })
    );
  }

  getBasketSubjectCurrentValue(): Basket | null {
    return this.basketSubject.value;
  }

  createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    console.log("basket_id "+basket.id);
    return basket;
  }

  mapProductToBasket(product: Product): BasketItem {
    return {
      id: product.id,
      productName: product.name,
      price: product.price,
      pictureUrl: product.pictureUrl,
      quantity: 0,
      productBrand: product.productBrand.name,
      productType: product.productType.name
    };
  }

  addItemToBasket(item: Product, quantity = 1): void {
    const cartItem = this.mapProductToBasket(item);
    let basket = this.getBasketSubjectCurrentValue() ?? this.createBasket();
    basket.items = this.upsertItem(basket.items, cartItem, quantity);
    this.setBasket(basket);
  }

  private upsertItem(items: BasketItem[], basketItem: BasketItem, quantity: number): BasketItem[] {
    const item = items.find(p => p.id === basketItem.id);
    if (item) {
      item.quantity += quantity;
    } else {
      basketItem.quantity = quantity;
      items.push(basketItem);
    }
    return items;
  }
}
