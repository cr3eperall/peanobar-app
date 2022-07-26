import { ProductComponent } from '../user/product/product.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrcodeComponent } from '../user/qrcode/qrcode.component';
import { QRCodeModule} from 'angularx-qrcode';
import { AccountComponent } from '../user/account/account.component';
import { UserOrderListComponent } from '../user/account/user-order-list/user-order-list.component';
import { AccountOrderOverlayComponent } from '../user/account/user-order-list/account-order-overlay/account-order-overlay.component';
import { QuantitySelectorOverlayComponent } from '../user/home/quantity-selector-overlay/quantity-selector-overlay.component';
import { QuantitySelectorComponent } from '../user/util/quantity-selector/quantity-selector.component';
import { OrderOverlayComponent } from '../user/cart/order-overlay/order-overlay.component';
import { HomeComponent } from '../user/home/home.component';
import { CartComponent } from '../user/cart/cart.component';
import { UserHeaderComponent } from '../user/header/user-header.component';


@NgModule({
  declarations: [
    UserHeaderComponent,
    QrcodeComponent,
    AccountComponent,
    UserOrderListComponent,
    AccountOrderOverlayComponent,
    QuantitySelectorComponent,
    QuantitySelectorOverlayComponent,
    OrderOverlayComponent,
    HomeComponent,
    CartComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    QRCodeModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  exports:[
    UserHeaderComponent
  ]
})
export class UserModule { }
