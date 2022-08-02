import { LoginService } from './../services/login.service';
import { RechargeComponent } from './recharge/recharge.component';
import { LoginComponent } from './../components/login/login.component';
import { BarHeaderComponent } from './header/bar-header.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path:"",component:BarHeaderComponent,children:[
    {path: "",component:LoginComponent},
    {path:"home",component:HomeComponent,canActivate:[LoginService]},
    {path:"products",component:ProductsComponent,canActivate:[LoginService]},
    {path:"recharge",component:RechargeComponent,canActivate:[LoginService]}
  ],canActivate:[LoginService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarRoutingModule { }