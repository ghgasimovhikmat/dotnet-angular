import { Component, OnDestroy } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
totalItemsCount: number = 0;

  constructor(public basketService: BasketService) { }



  ngOnInit(): void {
    // Subscribe to basket changes
    //this.getTotalCountItems();

  }
 /* getTotalCountItems(){
    this.basketService.basketSubject$.subscribe({
      next: (basket) => {
        this.totalItemsCount = basket ? this.basketService.getTotalItems() : 0;
        console.log('Total items count updated:', this.totalItemsCount);
      },
      error: (error) => console.error('Error updating total items count:', error)
    });
  }*/
}
