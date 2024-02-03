import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/models/product';
import { error } from 'console';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent  implements OnInit {

  quantity: number = 1; // Default quantity

  product?:Product;

  ngOnInit(): void {
    this.loadProduct();

  }
  constructor(private storeService: StoreService, private activatedRoute: ActivatedRoute,
    private router: Router) {}

  loadProduct(){
    const id=this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    if(id){
      this.storeService.getProduct(+id).subscribe({
      next:product=>this.product=product,

      error:error=>console.log(error)
      });
      console.log(this.product)
    }
  }
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

  goBack() {
    this.router.navigate(['/'])
    }


    addToCart() {
    throw new Error('Method not implemented.');
    }

    decrement() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    }

    increment() {
    this.quantity++;
    }
}
