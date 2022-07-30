import { BarRoutingModule } from './bar-routing.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BarHeaderComponent } from './header/bar-header.component';
import { OrderToprocessComponent } from './home/order-toprocess/order-toprocess.component';
import { CompleteOverlayComponent } from './home/complete-overlay/complete-overlay.component';
import { ProductsComponent } from './products/products.component';
import { EditOverlayComponent } from './products/edit-overlay/edit-overlay.component';
import { ProductComponent } from './products/product/product.component';
import { ImgSelectorComponent } from './util/img-selector/img-selector.component';



@NgModule({
  declarations: [
    HomeComponent,
    BarHeaderComponent,
    OrderToprocessComponent,
    CompleteOverlayComponent,
    ProductsComponent,
    EditOverlayComponent,
    ProductComponent,
    ImgSelectorComponent
  ],
  imports: [
    BarRoutingModule,
    CommonModule,
    FormsModule
  ]
})
export class BarModule { }
