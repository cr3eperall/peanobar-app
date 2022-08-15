import { LoginService } from './services/login.service';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "login",component:LoginComponent},
  {path: "logout",component:LogoutComponent},
  {path: "",loadChildren: ()=>import( /* webpackChunkName: "UserModule" */'./user/user.module').then(m=>m.UserModule)},
  {path: "bar",loadChildren: ()=>import( /* webpackChunkName: "BarModule" */"./bar/bar.module").then(m=>m.BarModule),canActivate:[LoginService]},
  {path: "admin",loadChildren: ()=>import( /* webpackChunkName: "AdminModule" */'./admin/admin.module').then(m=>m.AdminModule),canActivate:[LoginService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
