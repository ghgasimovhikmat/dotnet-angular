import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Basket, BasketItem, BasketTotal } from '../shared/models/basket';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basketSubject: BehaviorSubject<Basket | null> = new BehaviorSubject<Basket | null>(null);
  basketSubject$ = this.basketSubject.asObservable();
  private basketTotalBasket = new BehaviorSubject<BasketTotal | null>(null);

  basketTotalBasket$ = this.basketTotalBasket.asObservable();

  private readonly baseUrl = 'http://localhost:5233/api/Basket/';

  constructor(private http: HttpClient) { }
  removeItemFromBasket(itemId: number): void {
    const basket = this.getBasketSubjectCurrentValue();
    if (!basket) return;

    const newItems = basket.items.filter(item => item.id !== itemId);
    if (basket.items.length !== newItems.length) {
      basket.items = newItems;
      const updatedBasket$ = this.setBasket(basket);
      updatedBasket$.subscribe(() => {
        this.calculateTotal(); // Recalculate totals after removing item
      });
    }
  }

  incrementItemQuantity(item: BasketItem): void {
    const basket = this.getBasketSubjectCurrentValue();
    if (!basket) return;

    const foundItem = basket.items.find(basketItem => basketItem.id === item.id);
    if (foundItem) {
      foundItem.quantity++;
      const updatedBasket$ = this.setBasket(basket);
      updatedBasket$.subscribe(() => {
        this.calculateTotal(); // Recalculate totals after incrementing quantity
      });
    }
  }

  decrementItemQuantity(item: BasketItem): void {
    const basket = this.getBasketSubjectCurrentValue();
    if (!basket) return;

    const foundItem = basket.items.find(basketItem => basketItem.id === item.id);
    if (foundItem && foundItem.quantity > 1) {
      foundItem.quantity--;
      const updatedBasket$ = this.setBasket(basket);
      updatedBasket$.subscribe(() => {
        this.calculateTotal(); // Recalculate totals after decrementing quantity
      });
    }
  }
  /*
    incrementItemQuantity(item: BasketItem): void {
      const basket = this.getBasketSubjectCurrentValue();
      if (!basket) return; // Early return if basket is null

      const foundItem = basket.items.find(basketItem => basketItem.id === item.id);
      if (foundItem) {
        foundItem.quantity++;
        if(foundItem.quantity<1){
          foundItem.quantity=1
        }
        this.setBasket(basket);
      }
    }

    decrementItemQuantity(item: BasketItem): void {
      const basket = this.getBasketSubjectCurrentValue();
      if (!basket) return; // Early return if basket is null

      const foundItem = basket.items.find(basketItem => basketItem.id === item.id);
      if (foundItem && foundItem.quantity > 1) {
        foundItem.quantity--;
        this.setBasket(basket);
      }
    }


    removeItemFromBasket(itemId: number): void {
      const basket = this.getBasketSubjectCurrentValue();
      if (!basket) return; // Early return if basket is null

      const newItems = basket.items.filter(item => item.id !== itemId);
      if (basket.items.length !== newItems.length) {
        basket.items = newItems;
        this.setBasket(basket).subscribe({
          next: (updatedBasket) => {
            // Optionally, log the success or perform additional actions
            console.log('Basket successfully updated', updatedBasket);
          },
          error: (error) => {
            console.error('Failed to update basket', error);
          }
        });

        if (basket.items.length === 0) {
          localStorage.removeItem('basket_id');
        }
      }
    }
  */
  calculateTotal() {
    const currentBasket = this.getBasketSubjectCurrentValue();
    if (!currentBasket) return;
    const shipping = 0;
    const subtotal = currentBasket.items.reduce((sum, item) => (item.price * item.quantity) + sum, 0);
    const total = subtotal + shipping;

    console.log(`Calculating totals: Subtotal=${subtotal}, Shipping=${shipping}, Total=${total}`);

    this.basketTotalBasket.next({ shipping, total, subtotal });
  }


  getBasket(basketId: string): Observable<Basket> {
    return this.http.get<Basket>(this.baseUrl + basketId).pipe(

      tap(basket => {
        this.basketSubject.next(basket);
        //this.calculateTotal();
      }),

      catchError(error => {
        console.error('Error fetching basket:', error);
        throw error;
      })
    );

  }

  setBasket(basket: Basket): Observable<Basket> {
    return this.http.post<Basket>(this.baseUrl, basket).pipe(
      tap((updatedBasket: Basket) => {
        this.basketSubject.next(updatedBasket);
       // this.calculateTotal();
        console.log('Basket updated:', updatedBasket);
      }),
      catchError(error => {
        console.error('Error updating basket:', error);
        return throwError(() => new Error('Error updating basket'));
      })
    );
  }

  getBasketSubjectCurrentValue() {
    // return this.basketSubject.value;
    return this.basketSubject.value;//|| new Basket();
  }


  createBasket(): Basket {

    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);

    return basket;
  }

  mapProductToBasket(product: Product): BasketItem {
    const basketItems: BasketItem = {
      id: product.id,
      productName: product.name,
      price: product.price,
      pictureUrl: product.pictureUrl,
      quantity: 0,
      productBrand: product.productBrand,
      productType: product.productType
      // productBrand: product.productBrand.name,
      //productType: product.productType.name
    };
    console.log("map completed : ", basketItems);
    return basketItems;
  }

  /*addItemToBasket(item: Product, quantity = 1):  Observable<Basket>{
    //debugger;
    const cartItem = this.mapProductToBasket(item);
    let basket = this.getBasketSubjectCurrentValue() ?? this.createBasket();
    basket.items = this.upsertItem(basket.items, cartItem, quantity);
    return this.setBasket(basket);
  }*/
  addItemToBasket(item: Product, quantity = 1): Observable<Basket> {
    const cartItem = this.mapProductToBasket(item);
    let basket = this.getBasketSubjectCurrentValue() ?? this.createBasket();
    basket.items = this.upsertItem(basket.items, cartItem, quantity);
    const updatedBasket$ = this.setBasket(basket);
    updatedBasket$.subscribe(() => {
      this.calculateTotal(); // Recalculate totals after adding item
    });
    return updatedBasket$;
  }
  private upsertItem(items: BasketItem[], basketItem: BasketItem, quantity: number): BasketItem[] {
    // debugger;
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
/*setBasket(basket:Basket): Observable<Basket> {
  debugger
  return this.http.post<Basket>(`${this.baseUrl}`, basket).pipe(
    tap(updatedBasket => this.basketSubject.next(updatedBasket)),
    catchError(error => {
      console.error('Error updating basket:', error);
      throw error;
    })
  );
}
*/
/*  getTotalItems(): number {
    const basket = this.getBasketSubjectCurrentValue();
    if (!basket || !basket.items) {
      console.log('Basket or basket items are null:', basket);
      return 0;
    }
    console.log('Basket items:', basket.items); // Log basket items
    return basket.items.reduce((total, item) => total + item.quantity, 0);
  }
  /*getTotalItems(): number {
    const basket = this.getBasketSubjectCurrentValue();
    if (!basket) {
       return 0;
    }
    return basket.items.reduce((total, item) => total + item.quantity, 0);
  }*/
/* getBasket(basketId: string): Observable<Basket> {
   return this.http.get<Basket>(`${this.baseUrl}/${basketId}`).pipe(
     tap(basket => this.basketSubject.next(basket)),
     catchError(error => {
       console.error('Error fetching basket:', error);
       throw error;
     })
   );
 }

 getBasket(basketId: string): Observable<Basket> {
   debugger
   return this.http.get<Basket>(this.baseUrl + basketId).pipe(
     tap(basket => this.basketSubject.next(basket)),
     catchError(error => {
       console.error('Error fetching basket:', error);
       throw error;
     })
   );
 }
*/
/*

 private upsertItem(items: BasketItem[], basketItem: BasketItem, quantity: number): BasketItem[] {
    const index = items.findIndex(p => p.id === basketItem.id);
    if (index !== -1) {
        items[index].quantity += quantity; // Ensure quantity is updated
    } else {
        basketItem.quantity = quantity; // Set initial quantity for new item
        items.push(basketItem);
    }
    return items;
}
*/

