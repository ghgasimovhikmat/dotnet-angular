import { Component } from '@angular/core';
import { BasketService } from './basket.service'; // Update the path as necessary
import { Product } from '../shared/models/product';
import { BasketItem } from '../shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {


  constructor(public basketService: BasketService) { }

  extractImageName(item:BasketItem): string | null {
    if (item && item.pictureUrl) {
      // Split the pictureUrl by '/' and get the last part (the image name)
      const parts = item.pictureUrl.split('/');
      if(parts.length > 0){
        return parts[parts.length - 1];
      }

    }
    return null;
  }


}
