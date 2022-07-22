import { AccountComponent } from './components/user/account/account.component';
import { QrcodeComponent } from './components/user/qrcode/qrcode.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CartComponent } from './components/user/cart/cart.component';
import { HomeComponent } from './components/user/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path: "login",component:LoginComponent},
  {path: "logout",component:LogoutComponent},
  {path: "",component:LoginComponent},
  {path: "cart",component:CartComponent},
  {path: "qr",component:QrcodeComponent},
  {path: "account",component:AccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
