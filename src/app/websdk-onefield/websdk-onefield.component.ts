import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../cart.service';

export interface Config {
  sessionToken: string;
  status: string;
  orderId: number;
}

export interface Result {
  status: string;
  result: string;
}

declare global {
  interface Window {
    SafeCharge: any;
    checkout: any;
  }
}

@Component({
  selector: 'app-websdk-onefield',
  templateUrl: './websdk-onefield.component.html',
  styleUrls: ['./websdk-onefield.component.scss']
})
export class WebsdkOnefieldComponent implements OnInit {

  constructor(private cartService: CartService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  shippingCosts!: Observable<Config>;
  config: Config | undefined;
  cardNumber: any;
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

  getToken() {
    new Observable((observer) => {
      var that = this;
      this.triggerOverlay('show', 'loader-bar');
      this.sfc.getToken(this.cardNumber,
        {
          sessionToken: this.config?.sessionToken,
        }).then(function(res:any){
          that.triggerOverlay('hide', 'loader-bar');
          that.triggerOverlay('show', 'modal');
          console.log(res);
          observer.next(res);
          observer.complete();
      })
      //
    }).subscribe((value) => {
      this.setValue(value);
    });
  }

  auth() {
    new Observable((observer) => {
      this.triggerOverlay('show', 'loader-bar');

      this.sfc.authenticate3d(
        {
          sessionToken: this.config?.sessionToken,
          cardHolderName: 'CL-BRW1',
          paymentOption: this.cardNumber,
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
          cardHolderName: 'CL-BRW1',
          paymentOption: this.cardNumber,
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

    this.fieldStyles = {
      base: {
        fontFamily: 'Roboto, sans-serif',
        color: '#045d47',
        fontSize: '14px',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#00becf',
        },
      },
      invalid: {
        color: '#e5312b',
        ':focus': {
          color: '#303238',
        },
      },
      empty: {
        color: '#00becf',
        '::placeholder': {
          color: '#00becf',
        },
      },
      valid: {
        color: '#00A86b',
      },
    };

    this.fieldClasses = {
      focus: 'focused',
      empty: 'empty',
      invalid: 'invalid',
    };

    this.ScFields = this.sfc.fields({
      locale: 'en',
      fonts: [
        { cssUrl: 'https://fonts.googleapis.com/css?family=Source+Code+Pro' },
      ],
    });

    this.cardNumber = this.ScFields.create('card', {
      style: this.fieldStyles,
      classes: this.fieldClasses,
    });

    this.cardNumber.attach('#card-number');

  }

}
