import { BarRoutingModule } from './bar-routing.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BarHeaderComponent } from './header/bar-header.component';
import { OrderToprocessComponent } from './home/order-toprocess/order-toprocess.component';



@NgModule({
  declarations: [
    HomeComponent,
    BarHeaderComponent,
    OrderToprocessComponent
  ],
  imports: [
    BarRoutingModule,
    CommonModule,
    FormsModule
  ]
})
export class BarModule { }
