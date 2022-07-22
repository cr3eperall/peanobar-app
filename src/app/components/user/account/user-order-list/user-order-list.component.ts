import { OrderDTO, OrderStatus } from './../../../../services/OrderDTO';
import { OrderService } from './../../../../services/order.service';
import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-order-list',
  templateUrl: './user-order-list.component.html',
  styleUrls: ['./user-order-list.component.css']
})
export class UserOrderListComponent implements OnInit {
  prevDisabled=true;
  nextDisabled=true;
  overlayVisibility="hidden";
  size="10";
  page=1;
  nOrders=0;
  orders:OrderDTO[]=[];
  selectedOrder?:OrderDTO;
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.updateTable();
  }

  sizeChanged(){
    this.page=1;
    this.updateTable();
  }

  openOverlay(order:OrderDTO){
    this.selectedOrder=order;
    this.overlayVisibility="visible";
  }

  format(status:OrderStatus):string{
    switch (status) {
      case OrderStatus.IN_PROGRESS:
        return "In Progress";
        break;
      case OrderStatus.IN_CART:
        return "In Cart";
        break;
      case OrderStatus.COMPLETED:
        return "Completed";
        break;
      default:
        return "undefined"
        break;
    }
  }

  updateTable(){
    this.orderService.countOrders().subscribe((value)=>{
      this.nOrders=value;
      if (this.page<=1) {
        this.prevDisabled=true;
      }else{
        this.prevDisabled=false;
      }
  
      if (this.page*+this.size>this.nOrders) {
        this.nextDisabled=true;
      }else{
        this.nextDisabled=false;
      }
    });

    this.orderService.getOrders(this.page,+this.size).subscribe((value)=>{
      this.orders=value;
      for (let i = 0; i < this.orders.length; i++) {
        if (this.orders[i].status==OrderStatus.IN_CART) {
          this.orders.splice(i,1);
        }
      }
      //this.openOverlay(this.orders[0]);
    });
  }

  pageNext(){
    this.page++;
    this.updateTable();
  }

  pagePrev(){
    this.page--;
    this.updateTable();
  }

  onClose(){
    this.overlayVisibility="hidden";
  }

}
