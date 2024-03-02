import { Component, OnDestroy } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { Observable, Subscription } from 'rxjs';
import { AccountService } from '../../account/account.service';
import { Basket, BasketTotal } from '../../shared/models/basket';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  totalItemsCount: number = 0;
  basket$?: Observable<Basket | null>;
  currentUser$?: Observable<User | null>;
  constructor(public basketService: BasketService,
    public accountService: AccountService) { }



  ngOnInit(): void {
    // Subscribe to basket changes
    //this.getTotalCountItems();
    this.basket$ = this.basketService.basketSubject$ ;
    this.currentUser$ = this.accountService.userSource$;
  }

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
