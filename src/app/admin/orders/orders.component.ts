import { UserDTO } from './../../services/UserDTO';
import { OrderDTO } from './../../services/OrderDTO';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/bar/order.service';
import { UserService } from 'src/app/services/bar/user.service';

@Component({
	selector: 'app-orders',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
	prevDisabled = true;
	nextDisabled = true;
	size = '10';
	page = 1;
	nOrders = 0;
	orders: {order:OrderDTO,user?:UserDTO}[] = [];
	selectedOrder?: {order:OrderDTO,user?:UserDTO};

	constructor(private orderService:OrderService, private userService:UserService) {}

	ngOnInit(): void {
    this.updateTable();
  }

	sizeChanged() {
		this.page = 1;
		this.updateTable();
	}
	pageNext() {
		this.page++;
		this.updateTable();
	}

	pagePrev() {
		this.page--;
		this.updateTable();
	}

  updateTable(){
    this.prevDisabled=true;
    this.nextDisabled=true;
    this.orderService.countCompleted().subscribe((value)=>{
      this.nOrders=value;
      if (this.page<=1) {
        this.prevDisabled=true;
      }else{
        this.prevDisabled=false;
      }
      
      if (this.page*+this.size>=this.nOrders) {
        this.nextDisabled=true;
      }else{
        this.nextDisabled=false;
      }
    });

    this.orderService.getAll(this.page,+this.size).subscribe((value)=>{
      this.orders=[];
      for (const order of value) {
        let res={order:order,user:undefined};
        const idx=this.orders.push(res)-1;
        if (order.owner!=undefined&&order.owner!=undefined) {
          this.userService.getUser(order.owner).subscribe((value)=>{
            this.orders[idx].user=value;
          });
        }else{
          this.orders[idx].user=undefined;
        }
      }
      //this.openOverlay(this.orders[0]);
    });
  }

  openOverlay(order:{order:OrderDTO,user?:UserDTO}){
    this.selectedOrder=order;
  }

  onClose(){
    this.selectedOrder=undefined;
  }
}
