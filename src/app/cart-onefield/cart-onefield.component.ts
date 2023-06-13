import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-onefield',
  templateUrl: './cart-onefield.component.html',
  styleUrls: ['./cart-onefield.component.scss']
})
export class CartOnefieldComponent implements OnInit {

  constructor(
    private cartService: CartService
  ) { }

  items = this.cartService.getItems();

  ngOnInit(): void {
  }

}
