import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './../bar/products/products.component';
import { LoginService } from './../services/login.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { HeaderComponent as AdminHeaderComponent } from "./header/header.component";

const routes: Routes = [{path:"",component:AdminHeaderComponent,children:[
  {path: "",component:LoginComponent},
  {path:"home",component:HomeComponent,canActivate:[LoginService]},
  {path: "products",component:ProductsComponent,canActivate:[LoginService]},
  {path: "orders",component:OrdersComponent,canActivate:[LoginService]},
],canActivate:[LoginService]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
