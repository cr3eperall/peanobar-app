import { OrderDTO, OrderItem } from './../../../services/OrderDTO';
import { Component, OnInit, Output, EventEmitter, Input, HostBinding } from '@angular/core';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-complete-overlay',
  templateUrl: './complete-overlay.component.html',
  styleUrls: ['./complete-overlay.component.css']
})
export class CompleteOverlayComponent implements OnInit {

  private _orders:OrderDTO[]=[];
  @Output()
  completed=new EventEmitter();
  @Output()
  closed=new EventEmitter();
  @HostBinding("style.--msg-bg-color")
  messageBg="transparent";
  @HostBinding("style.--msg-color")
  messageColor="transparent";
  message="";
  buttonDisabled=false;
  products:OrderItem[]=[];
  constructor(private home:HomeComponent) { }

  ngOnInit(): void {
  }

  @Input()
  public get orders() : OrderDTO[] {
    return this._orders;
  }

  
  public set orders(v : OrderDTO[]) {
    this._orders = v;
    this.products=this.home.getProducts(this.home.getProductsMap(this.orders));
  }

  close(){
    this.closed.emit();
    this.messageBg="transparent"
    this.messageColor="transparent"
  }

  complete(){
    this.completed.emit();
    this.messageBg="green";
    this.messageColor="black";
    this.message="marking as completed";
  }

}
