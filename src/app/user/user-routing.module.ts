import { AccountComponent } from './account/account.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './../components/login/login.component';
import { UserHeaderComponent } from './header/user-header.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {path:"",component:UserHeaderComponent,children:[
        {path:"",component:LoginComponent},
        {path:"home",component:HomeComponent},
        {path: "cart",component:CartComponent},
        {path: "qr",component:QrcodeComponent},
        {path: "account",component:AccountComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }