import { Injectable } from '@angular/core';
import { Product } from './products';
import { HttpClient } from '@angular/common/http';

export interface Config {
  sessionToken: string;
  status: string;
  orderId: number
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  constructor(
    private http: HttpClient
  ) { }

  items: Product[] = [{
    id: 1,
    name: 'Phone XL',
    price: 729,
    description: 'A large phone with one of the best screens'
  },
  {
    id: 1,
    name: 'Phone L',
    price: 129,
    description: 'A large phone with one of the best screens'
  },
  {
    id: 1,
    name: 'Phone X',
    price: 1729,
    description: 'A large phone with one of the best screens'
  }];

  addToCart(product: Product) {
    this.items.push(product);
  }

  getItems() {
    return this.items
  }
  
  clearCart() {
    this.items = [];
    return this.items;
  }

  getShippingPrices() {
    return this.http.get<Config>('https://n-fix-cors.herokuapp.com/https://demos.nuvei.com/websdkdemo/openOrder');
  }
  
}
