// product-items.component.ts
import { Component, Input } from '@angular/core';
import { Product } from '../../shared/models/product';


@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.scss']
})
export class ProductItemsComponent {
  @Input() product: Product | undefined;

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
}
