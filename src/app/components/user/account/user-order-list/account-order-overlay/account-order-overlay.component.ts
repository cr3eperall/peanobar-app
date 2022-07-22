import { OrderDTO } from './../../../../../services/OrderDTO';
import { Component, OnInit, Output, EventEmitter, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-account-order-overlay',
  templateUrl: './account-order-overlay.component.html',
  styleUrls: ['./account-order-overlay.component.css']
})
export class AccountOrderOverlayComponent implements OnInit {
  @Input()
  order?:OrderDTO;
  @Output()
  closed=new EventEmitter();
  @HostBinding("style.--hidden")
  _hidden="hidden";
  constructor() { }

  public get hidden() : string {
    return this._hidden;
  }

  @Input()
  public set hidden(hid : string) {
    this._hidden = hid;
    if (hid=="visible") {
      
    }
  }

  ngOnInit(): void {
  }

  close(){
    this.closed.emit();
  }

}
