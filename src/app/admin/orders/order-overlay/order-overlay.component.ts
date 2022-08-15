import { UserDTO } from './../../../services/UserDTO';
import { OrderDTO } from './../../../services/OrderDTO';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-overlay',
  templateUrl: './order-overlay.component.html',
  styleUrls: ['./order-overlay.component.css']
})
export class OrderOverlayComponent implements OnInit {
  @Input()
  order?:{order:OrderDTO,user?:UserDTO};
  @Output()
  closed=new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  close(){
    this.closed.emit();
  }

}
