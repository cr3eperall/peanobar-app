import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent as AdminHeaderComponent } from './header/header.component';
import { OrdersComponent } from './orders/orders.component';
import { BarModule } from '../bar/bar.module';
import { AccountComponent } from './home/account/account.component';
import { ClassroomComponent } from './home/classroom/classroom.component';
import { AccountEditOverlayComponent } from './home/account/account-edit-overlay/account-edit-overlay.component';
import { ClassroomEditOverlayComponent } from './home/classroom/classroom-edit-overlay/classroom-edit-overlay.component';
import { OrderOverlayComponent } from './orders/order-overlay/order-overlay.component';
import { ConfirmOverlayComponent } from './home/confirm-overlay/confirm-overlay.component';


@NgModule({
  declarations: [
    HomeComponent,
    AdminHeaderComponent,
    OrdersComponent,
    AccountComponent,
    ClassroomComponent,
    AccountEditOverlayComponent,
    ClassroomEditOverlayComponent,
    OrderOverlayComponent,
    ConfirmOverlayComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
