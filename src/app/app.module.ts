import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/user/home/home.component';
import { CartComponent } from './components/user/cart/cart.component';
import { HeaderComponent } from './components/user/header/header.component';
import { ProductComponent } from './components/product/product.component';
import { QuantitySelectorOverlayComponent } from './components/user/home/quantity-selector-overlay/quantity-selector-overlay.component';
import { QuantitySelectorComponent } from './components/util/quantity-selector/quantity-selector.component';
import { OrderOverlayComponent } from './components/user/cart/order-overlay/order-overlay.component';
import { LogoutComponent } from './components/logout/logout.component';
import { QrcodeComponent } from './components/user/qrcode/qrcode.component';
import { QRCodeModule} from 'angularx-qrcode';
import { AccountComponent } from './components/user/account/account.component';
import { UserOrderListComponent } from './components/user/account/user-order-list/user-order-list.component';
import { AccountOrderOverlayComponent } from './components/user/account/user-order-list/account-order-overlay/account-order-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CartComponent,
    HeaderComponent,
    ProductComponent,
    QuantitySelectorOverlayComponent,
    QuantitySelectorComponent,
    OrderOverlayComponent,
    LogoutComponent,
    QrcodeComponent,
    AccountComponent,
    UserOrderListComponent,
    AccountOrderOverlayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
