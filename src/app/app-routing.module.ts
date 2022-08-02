import { LoginService } from './services/login.service';
import { BarHeaderComponent } from './bar/header/bar-header.component';
import { HomeComponent as BarHomeComponent} from './bar/home/home.component';
import { UserHeaderComponent } from './user/header/user-header.component';
import { AccountComponent } from './/user/account/account.component';
import { QrcodeComponent } from './user/qrcode/qrcode.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CartComponent } from './user/cart/cart.component';
import { HomeComponent as UserHomeComponent } from './user/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "login",component:LoginComponent},
  {path: "logout",component:LogoutComponent},
  {path: "",loadChildren: ()=>import( /* webpackChunkName: "UserModule" */'./user/user.module').then(m=>m.UserModule)},
  {path: "bar",loadChildren: ()=>import( /* webpackChunkName: "BarModule" */'./bar/bar.module').then(m=>m.BarModule),canActivate:[LoginService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
