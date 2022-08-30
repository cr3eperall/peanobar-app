import { AccountOrderOverlayComponent } from './components/account/user-order-list/account-order-overlay/account-order-overlay.component';
import { AccountComponent } from './components/account/account.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { LogoutComponent } from './components/logout/logout.component';
import { UserOrderListComponent } from './components/account/user-order-list/user-order-list.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { ResetpwComponent } from './components/resetpw/resetpw.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AccountOrderOverlayComponent,
    UserOrderListComponent,
    ForgotComponent,
    ResetpwComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
