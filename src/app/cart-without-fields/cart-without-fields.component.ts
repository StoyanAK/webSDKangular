import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../cart.service';
import { Config } from '../websdk/websdk.component';

@Component({
  selector: 'app-cart-without-fields',
  templateUrl: './cart-without-fields.component.html',
  styleUrls: ['./cart-without-fields.component.scss']
})
export class CartWithoutFieldsComponent implements OnInit {

  constructor(private cartService: CartService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  shippingCosts!: Observable<Config>;
  config: Config | undefined;
  cardNumber: any;
  expMonth: string | undefined;
  expYear: string | undefined;
  cardHolderName: string | undefined;
  cardExpiry: any;
  cardCvc: any;
  sfc: any;
  fieldStyles: any;
  fieldClasses: any;
  ScFields: any;
  result: any | undefined;
  test$: any;
  name$: string | undefined;

  ngOnInit(): void {
    this.cartService.getShippingPrices().subscribe((data) => {
      this.config = { ...data };
      this.attachFields(data);
    });
    // this.result = { result: 'test' }
    // Create a new Observable that will deliver the above sequence
  }

  getCardNumber(value: string) {
    this.cardNumber = value;
  }
  getExpMonth(value: string) {
    this.expMonth = value;
  }
  getExpYear(value: string) {
    this.expYear = value;
  }
  getCvv(value: string) {
    this.cardCvc = value;
  }
  getName(value: string) {
    this.cardHolderName = value
  }

  setValue(res: any) {
    this.result = res;
  }

  triggerOverlay(show: string, type: string) {
    let overlay = document.getElementById(type);

    if (overlay && show === 'show') {
      overlay.style.visibility = 'visible';
    } else if (overlay && show === 'hide') {
      overlay.style.visibility = 'hidden';
    }
  }

  hideOverlay() {
    this.triggerOverlay('hide', 'modal');
  }

  auth() {
    new Observable((observer) => {
      this.triggerOverlay('show', 'loader-bar');

      this.sfc.authenticate3d(
        {
          sessionToken: this.config?.sessionToken,
          paymentOption : {
            card : {
              cardNumber      : this.cardNumber,
              cardHolderName  : this.cardHolderName,
              expirationMonth : this.expMonth,
              expirationYear  : this.expYear,
              CVV             : this.cardCvc
            }
          }
        },
        (res: any) => {
          this.triggerOverlay('hide', 'loader-bar');
          this.triggerOverlay('show', 'modal');
          console.log(res);

          observer.next(res);
          observer.complete();
        }
      );
    }).subscribe((value) => {
      this.setValue(value);
    });
  }


  createPayment() {
    new Observable((observer) => {
      this.triggerOverlay('show', 'loader-bar');
      this.sfc.createPayment(
        {
          sessionToken: this.config?.sessionToken,
          paymentOption : {
            card : {
              cardNumber      : this.cardNumber,
              cardHolderName  : this.cardHolderName,
              expirationMonth : this.expMonth,
              expirationYear  : this.expYear,
              CVV             : this.cardCvc
            }
          }
        },
        (res: any) => {
          this.triggerOverlay('hide', 'loader-bar');
          this.triggerOverlay('show', 'modal');
          console.log(res);

          observer.next(res);
          observer.complete();
        }
      );
    }).subscribe((value) => {
      this.setValue(value);
    });
  }

  async attachFields(order: any) {
    console.log(order);
    this.sfc = window.SafeCharge({
      merchantId: order.merchantId,
      env: 'int',
      merchantSiteId: order.merchantSiteId,
    });
  }

}
