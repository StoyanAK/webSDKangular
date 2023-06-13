import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { WebsdkComponent } from './websdk/websdk.component';
import { CartOnefieldComponent } from './cart-onefield/cart-onefield.component';
import { WebsdkOnefieldComponent } from './websdk-onefield/websdk-onefield.component';
import { CartWithoutFieldsComponent } from './cart-without-fields/cart-without-fields.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    TopBarComponent,
    ProductDetailsComponent,
    CartComponent,
    WebsdkComponent,
    CartOnefieldComponent,
    WebsdkOnefieldComponent,
    CartWithoutFieldsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: CartComponent },
      // { path: '/products', component: ProductListComponent },
      { path: 'products/:productId', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'cartonefield', component: CartOnefieldComponent },
      { path: 'withoutfields', component: CartWithoutFieldsComponent },
    ],
    {
      onSameUrlNavigation: 'reload',
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
