// product-items.component.ts
import { Component, Input } from '@angular/core';
import { Product } from '../../shared/models/product';
import { BasketService } from '../../basket/basket.service';
import { Basket } from '../../shared/models/basket';


@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.scss']
})
export class ProductItemsComponent {
  @Input() product: Product | undefined;

  constructor(private basketService: BasketService){}

  extractImageName(): string | null {
    if (this.product && this.product.pictureUrl) {
      // Split the pictureUrl by '/' and get the last part (the image name)
      const parts = this.product.pictureUrl.split('/');
      if(parts.length > 0){
        return parts[parts.length - 1];
      }

    }
    return null;
  }

 /* addItemToBasket(){
    console.log( this.product);
    this.product&&this.basketService.addItemToBasket(this.product);
  }

addItemToBasket() {
  if (this.product) {

    // Map the Product to a BasketItem
   // const basketItem = this.basketService.mapProductToBasket(this.product);

    // Add the BasketItem to the existing basket or create a new one if it doesn't exist
   // const basket = this.basketService.getBasketSubjectCurrentValue() || this.basketService.createBasket();
   // basket.items.push(basketItem);
   console.log('Items :', this.product);
    // Set the updated basket
   this.product && this.basketService.addItemToBasket(this.product);

        // You can add any additional logic here after basket update

  }
*/
  addItemToBasket() {
    if (this.product) {
      // Now, addItemToBasket returns an Observable<Basket>, so we subscribe to it
      this.basketService.addItemToBasket(this.product, 1).subscribe({
        next: (basket) => {
          console.log('Basket updated successfully', basket);
          // Handle successful basket update, e.g., show a confirmation message
        },
        error: (error) => {
          console.error('Error updating the basket:', error);
          // Handle error, e.g., show an error message
        }
      });
    }
  }

}
/*
addItemToBasket() {
  if (this.product) {
    // Map the Product to a BasketItem
    const basketItem = this.basketService.mapProductToBasket(this.product);

    // Get the current basket
    const basket = this.basketService.getBasketSubjectCurrentValue() || this.basketService.createBasket();

    // Create a new array with existing items and the new item
    const updatedItems = [...basket.items, basketItem];

    // Update the basket with the new items array
    basket.items = updatedItems;

    // Set the updated basket
    this.basketService.setBasket(basket).subscribe({
      next: (updatedBasket: Basket) => {
        console.log('Basket updated:', updatedBasket);
        // You can add any additional logic here after basket update
      },
      error: (error: any) => {
        console.error('Error updating basket:', error);
        // Handle error here if necessary
      }
    });
  }
}
*/


