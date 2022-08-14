import { HttpErrorResponse } from '@angular/common/http';
import { CartComponent } from './../cart.component';
import { OrderDTO, OrderStatus } from './../../../services/OrderDTO';
import { LoginService } from './../../../services/login.service';
import { OrderService } from './../../../services/order.service';
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-order-overlay',
  templateUrl: './order-overlay.component.html',
  styleUrls: ['./order-overlay.component.css']
})
export class OrderOverlayComponent implements OnInit {
  @Input()
  orders?:OrderDTO;
  @Output()
  closed=new EventEmitter();
  @HostBinding("style.--prod-hidden")
  prodHidden="visible";
  @HostBinding("style.--msg-bg-color")
  bgColor="green";
  @HostBinding("style.--msg-color")
  msgColor="black"
  message=$localize `Order Sent`;

  @HostBinding("style.--hidden")
  private _hidden="hidden";
  constructor(private orderService:OrderService, private loginService:LoginService, private cartComponent:CartComponent) { }

  ngOnInit(): void { }
  
  public get hidden() : string {
    return this._hidden;
  }

  @Input()
  public set hidden(hid : string) {
    this._hidden = hid;
    if (hid=="visible") {
      this.prodHidden="visible";
      this.message="";
      this.bgColor="transparent";
      this.cartComponent.updateCart().subscribe((value)=>{
        this.orders=value;
      });
    }
  }  

  close(){
    this.prodHidden="hidden"
    this.closed.emit();
  }

  order(){
    this.prodHidden="hidden";
    this.orderService.sendOrder().subscribe({
      next: (value)=>{
        if(value.status==OrderStatus.IN_PROGRESS){
          this.message=$localize `Order Sent`;
          this.prodHidden="hidden";
          this.bgColor="green";
          this.msgColor="black";
          timer(1000).subscribe(()=>{this.close();window.location.reload();});
        }
      },error:(err:HttpErrorResponse)=>{
        if(err.error.startsWith("Not enough balance")){
          this.message=$localize `Not enough balance`;
        }else{
          this.message=$localize `Error`;
        }
        this.prodHidden="visible";
        this.bgColor="rgb(221, 75, 57)";
        this.msgColor="black";
        console.log(err);
      }});
  }

}
