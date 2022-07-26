import { UserHeaderComponent } from './user/header/user-header.component';
import { AccountComponent } from './/user/account/account.component';
import { QrcodeComponent } from './user/qrcode/qrcode.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CartComponent } from './user/cart/cart.component';
import { HomeComponent } from './user/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"",component:UserHeaderComponent,children:[
    {path:"home",component:HomeComponent},
    {path: "",component:LoginComponent},
    {path: "cart",component:CartComponent},
    {path: "qr",component:QrcodeComponent},
    {path: "account",component:AccountComponent}
  ]},
  {path: "login",component:LoginComponent},
  {path: "logout",component:LogoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
