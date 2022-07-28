import { UserService } from './../../../services/bar/user.service';
import { UserDTO } from './../../../services/UserDTO';
import { OrderDTO } from './../../../services/OrderDTO';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { expand } from 'rxjs';

@Component({
  selector: 'app-order-toprocess',
  templateUrl: './order-toprocess.component.html',
  styleUrls: ['./order-toprocess.component.css']
})
export class OrderToprocessComponent implements OnInit {

  private _order?:OrderDTO;
  user?:UserDTO;
  expanded=false;
  @Input()
  type:"user"|"classroom"="user";
  @Output()
  selectionChanged=new EventEmitter<{checked:boolean,order:OrderDTO,type:"user"|"classroom"}>();
  constructor(private userService:UserService) { }
  //TODO add media query;
  ngOnInit(): void {
  }

  
  public get order() : OrderDTO | undefined {
    return this._order;
  }

  @Input()
  public set order(v : OrderDTO|undefined) {
    this._order = v;
    if (this._order) {
      this._order!.total=this.getTotal();
      this.userService.getUser(this._order!.owner).subscribe((value)=>{
        this.user=value;
      });
    }
  }

  countItems():number{
    if(!this.order){
      return 0;
    }
    let sum=0;
    for (const item of this.order.contents) {
      sum+=item.quantity;
    }
    return sum;
  }

  completed(value:Event){
    this.selectionChanged.emit({checked:(value.target as HTMLInputElement).checked, order:this.order!,type:this.type});
  }

  toggleExpansion(value:Event){
    this.expanded=!this.expanded;
  }

  getTotal():number{
    let total=0;
    for (const item of this.order!.contents) {
      total+=item.product.cost*item.quantity;
    }
    return total;
  }
  

}
