import { Component, OnInit } from '@angular/core';
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
  // name: string;
  // price: number;
  // description: string;
}

declare global {
  interface Window {
    SafeCharge: any;
  }
}

@Component({
  selector: 'app-websdk',
  templateUrl: './websdk.component.html',
  styleUrls: ['./websdk.component.scss'],
})
export class WebsdkComponent implements OnInit {
  constructor(private cartService: CartService) {}

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

    this.cardNumber = this.ScFields.create('ccNumber', {
      style: this.fieldStyles,
      classes: this.fieldClasses,
    });

    this.cardNumber.attach('#card-number');

    this.cardExpiry = this.ScFields.create('ccExpiration', {
      style: this.fieldStyles,
      classes: this.fieldClasses,
    });

    this.cardExpiry.attach('#card-expiry');

    this.cardCvc = this.ScFields.create('ccCvc', {
      style: this.fieldStyles,
      classes: this.fieldClasses,
    });

    this.cardCvc.attach('#card-cvc');
  }
}
